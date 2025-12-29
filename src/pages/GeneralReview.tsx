import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { X, ArrowRight, Zap } from 'lucide-react';
import { courses } from '../data/courses';
import { useProgress } from '../hooks/useProgress';
import MultipleChoice from '../components/exercises/MultipleChoice';
import Matching from '../components/exercises/Matching';
import FillBlank from '../components/exercises/FillBlank';
import type { Exercise } from '../types';
import { sample, shuffle } from '../utils/questions';

interface Props {
    addXp?: (amount: number) => void;
}

export default function GeneralReview({ addXp }: Props) {
    const { courseId, unitIdx } = useParams<{ courseId: string; unitIdx: string }>();
    const navigate = useNavigate();

    const currentUnitIdx = Number(unitIdx);
    const course = courseId ? courses[courseId] : undefined;

    const { isReviewUnlocked } = useProgress(courseId ?? '');

    const [questions, setQuestions] = useState<Exercise[]>([]);
    const [idx, setIdx] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [earnedXp, setEarnedXp] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        if (!course) return;

        // Get ALL units up to the current one
        const relevantUnits = course.units.slice(0, currentUnitIdx + 1);

        // Extract exercises from ALL lessons in those units
        const globalPool: Exercise[] = relevantUnits.flatMap(u =>
            u.lessons.flatMap(l => l.exercises ?? [])
        );

        // Sample 10 questions
        const pick = sample(globalPool, 10);

        setQuestions(shuffle(pick));
        setIdx(0);
        setAnswered(false);
        setIsCorrect(false);
        setEarnedXp(0);
        setComplete(false);
        setCorrectCount(0);
    }, [course, currentUnitIdx]);

    // Security Check
    if (!isReviewUnlocked(currentUnitIdx)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center text-white">
                <h2 className="text-xl font-bold mb-2">Review Locked</h2>
                <p className="text-slate-400 mb-6">You must pass the Unit Quiz before accessing the Cumulative Review.</p>
                <Link to={`/course/${courseId}`} className="px-6 py-2 bg-slate-700 rounded-lg hover:bg-slate-600">Back to Path</Link>
            </div>
        );
    }

    const exercise = questions[idx];
    const progress = ((idx + (answered ? 1 : 0)) / Math.max(1, questions.length)) * 100;

    const handleAnswer = (correct: boolean) => {
        setAnswered(true);
        setIsCorrect(correct);
        if (correct) {
            const xpGain = 10;
            setEarnedXp(prev => prev + xpGain);
            addXp?.(xpGain);
            setCorrectCount(prev => prev + 1);
        }
    };

    const handleContinue = () => {
        if (idx < questions.length - 1) {
            setIdx(prev => prev + 1);
            setAnswered(false);
            setIsCorrect(false);
        } else {
            setComplete(true);
        }
    };

    const renderExercise = () => {
        if (!exercise) return null;
        const uniqueKey = exercise.question;
        switch (exercise.type) {
            case 'multiple': return <MultipleChoice key={uniqueKey} exercise={exercise} onAnswer={handleAnswer} answered={answered} />;
            case 'matching': return <Matching key={uniqueKey} exercise={exercise} onAnswer={handleAnswer} answered={answered} />;
            case 'fillblank': return <FillBlank key={uniqueKey} exercise={exercise} onAnswer={handleAnswer} answered={answered} />;
            default: return null;
        }
    };

    if (complete) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                    <Zap className="w-10 h-10 text-emerald-500" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Review Complete!</h1>
                <p className="text-slate-400 mb-6">You answered {correctCount} / {questions.length} correct  ({earnedXp} XP).</p>
                <div className="flex gap-3">
                    <Link to={`/course/${courseId}`} className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors">
                        Back to Course
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(`/course/${courseId}`)} className="text-slate-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
                <span className="text-slate-400 text-sm">{idx + 1}/{questions.length}</span>
            </div>

            <div className="mb-2">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Cumulative Review</span>
            </div>

            <div className="mb-8">{renderExercise()}</div>

            {answered && (
                <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                    <div className={`font-semibold mb-1 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isCorrect ? '✓ Correct!' : '✗ Not quite'}
                    </div>
                    {exercise.explanation && <p className="text-slate-300 text-sm">{exercise.explanation}</p>}
                </div>
            )}

            {answered && (
                <div className="flex gap-3">
                    <button onClick={handleContinue} className="flex-1 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2">
                        Continue <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}