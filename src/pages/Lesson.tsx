import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { X, ArrowRight, CheckCircle, BookOpen } from 'lucide-react'; // Removed RotateCcw
import { courses } from '../data/courses';
import { useProgress } from '../hooks/useProgress';
import MultipleChoice from '../components/exercises/MultipleChoice';
import Matching from '../components/exercises/Matching';
import FillBlank from '../components/exercises/FillBlank';
import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
import type { Exercise } from '../types';
import { sample, shuffle } from '../utils/questions';

interface LessonProps {
    addXp: (amount: number) => void;
}

export default function Lesson({ addXp }: LessonProps) {
    const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
    const navigate = useNavigate();
    const { markCompleted } = useProgress(courseId ?? '');

    const [unitIdx, lessonIdx] = (lessonId ?? '0-0').split('-').map(Number);
    const course = courseId ? courses[courseId] : undefined;
    const lesson = course?.units[unitIdx]?.lessons[lessonIdx];

    const [exerciseIdx, setExerciseIdx] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [earnedXp, setEarnedXp] = useState(0);
    const [screen, setScreen] = useState<'intro' | 'exercise' | 'complete'>(
        lesson?.intro ? 'intro' : 'exercise'
    );

    // Session-level sampled questions for practice: 5 per lesson
    const [sessionQuestions, setSessionQuestions] = useState<Exercise[]>([]);

    //
    const [correctCount, setCorrectCount] = useState(0);
    const PASS_PERCENT = 0.7; // 70%, effectively 80% for 5-question practice

    useEffect(() => {
        const generate = () => {
            const pool = lesson?.exercises ?? [];
            if (pool.length === 0) return;

            const picked = sample(pool as Exercise[], 5);
            setSessionQuestions(shuffle(picked));
            setExerciseIdx(0);
            setAnswered(false);
            setIsCorrect(false);
            setEarnedXp(0);
            setCorrectCount(0);
        };
        generate();
    }, [lesson?.title, lesson?.exercises]);

    if (!lesson) {
        return <div className="text-white">Lesson not found</div>;
    }

    const currentQuestions = sessionQuestions.length > 0 ? sessionQuestions : lesson.exercises;
    const exercise = currentQuestions[exerciseIdx];
    const progress = ((exerciseIdx + (answered ? 1 : 0)) / Math.max(1, currentQuestions.length)) * 100;

    const handleAnswer = (correct: boolean) => {
        setAnswered(true);
        setIsCorrect(correct);
        if (correct) {
            const xpGain = 10;
            setEarnedXp(prev => prev + xpGain);
            addXp(xpGain);
            setCorrectCount(prev => prev + 1);
        }
        // No else block needed; if wrong, no XP, but answered is true
    };

    const handleContinue = () => {
        if (exerciseIdx < currentQuestions.length - 1) {
            setExerciseIdx(prev => prev + 1);
            setAnswered(false);
            setIsCorrect(false);
        } else {
            const passed = (correctCount / currentQuestions.length) >= PASS_PERCENT;
            if (passed) {
                markCompleted(lessonId ?? '');
            }

            setScreen('complete');
        }
    };

    const handlePracticeAgain = () => {
        const pool = lesson?.exercises ?? [];
        const picked = sample(pool as Exercise[], 5);
        setSessionQuestions(shuffle(picked));
        setExerciseIdx(0);
        setAnswered(false);
        setIsCorrect(false);
        setEarnedXp(0);
        setCorrectCount(0);
        setScreen(lesson.intro ? 'intro' : 'exercise');
    };

    const renderExercise = () => {
        if (!exercise) return <div>Loading...</div>;

        const uniqueKey = exercise.question;

        switch (exercise.type) {
            case 'multiple':
                return <MultipleChoice key={uniqueKey} exercise={exercise} onAnswer={handleAnswer} answered={answered} />;
            case 'matching':
                return <Matching key={uniqueKey} exercise={exercise} onAnswer={handleAnswer} answered={answered} />;
            case 'fillblank':
                return <FillBlank key={uniqueKey} exercise={exercise} onAnswer={handleAnswer} answered={answered} />;
            default:
                return <div>Unknown exercise type</div>;
        }
    };

    // --- SCREEN: COMPLETE ---
    if (screen === 'complete') {
        const passed = (correctCount / currentQuestions.length) >= PASS_PERCENT;
        const percentage = Math.round((correctCount / currentQuestions.length) * 100);

        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${passed ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                    {passed ? (
                        <CheckCircle className="w-10 h-10 text-emerald-500" />
                    ) : (
                        <X className="w-10 h-10 text-red-500" />
                    )}
                </div>

                <h1 className="text-2xl font-bold text-white mb-2">
                    {passed ? 'Lesson Complete!' : 'Lesson Failed'}
                </h1>

                <p className="text-slate-400 mb-6">
                    You scored {percentage}% ({correctCount}/{currentQuestions.length})
                </p>

                {!passed && (
                    <p className="text-red-400 mb-6 max-w-xs mx-auto">
                        You need {PASS_PERCENT * 100}% to pass this lesson. Don't worry, keeping your XP!
                    </p>
                )}

                <div className="flex gap-3">
                    <Link
                        to={`/course/${courseId}`}
                        className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors"
                    >
                        Back to Course
                    </Link>
                    <button
                        onClick={handlePracticeAgain}
                        className={`px-6 py-3 text-white font-semibold rounded-xl transition-colors ${passed ? 'bg-sky-600 hover:bg-sky-500' : 'bg-red-600 hover:bg-red-500'}`}
                    >
                        {passed ? 'Practice Again' : 'Try Again'}
                    </button>
                </div>
            </div>
        );
    }

    // --- SCREEN: INTRO ---
    if (screen === 'intro' && lesson.intro) {
        const fullMarkdownContent = Array.isArray(lesson.intro.content)
            ? lesson.intro.content.join('\n\n')
            : lesson.intro.content;

        return (
            <div className="max-w-2xl mx-auto prose prose-slate">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate(`/course/${courseId}`)} className="text-slate-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                    <div className="flex-1" />
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-sky-400" />
                    </div>
                    <div>
                        <p className="text-sky-400 text-sm font-medium">Lesson Introduction</p>
                        <h1 className="text-2xl font-bold text-white">{lesson.intro.title}</h1>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="prose prose-invert prose-slate max-w-none">
                        <ReactMarkdown
                            // remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ children }) => <h1 className="text-2xl font-bold text-white mt-6 mb-2">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-xl font-semibold text-white mt-4 mb-2">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-lg font-medium text-white mt-3 mb-1">{children}</h3>,
                                p: ({ children }) => <p className="text-slate-300 leading-relaxed">{children}</p>,
                                table: ({ children }) => (
                                    <div className="overflow-x-auto my-4 border border-slate-700 rounded-lg">
                                        <table className="min-w-full text-sm align-middle divide-y divide-slate-700">{children}</table>
                                    </div>
                                ),
                                thead: ({ children }) => <thead className="bg-slate-800/50 text-slate-300 font-medium">{children}</thead>,
                                tbody: ({ children }) => <tbody className="divide-y divide-slate-700">{children}</tbody>,
                                tr: ({ children }) => <tr className="odd:bg-slate-900/20">{children}</tr>,
                                th: ({ children }) => <th className="px-3 py-2 text-left text-slate-300 font-semibold">{children}</th>,
                                td: ({ children }) => <td className="px-3 py-2 text-slate-300">{children}</td>,
                                ul: ({ children }) => <ul className="list-disc list-inside text-slate-300 space-y-1 my-4 pl-4">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal list-inside text-slate-300 space-y-1 my-4 pl-4">{children}</ol>,
                                li: ({ children }) => <li className="text-slate-300">{children}</li>,
                                strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                                code: ({ children }) => <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 text-sm">{children}</code>,
                            }}
                        >
                            {fullMarkdownContent}
                        </ReactMarkdown>
                    </div>
                </div>

                <button
                    onClick={() => setScreen('exercise')}
                    className="w-full py-4 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-500 transition-colors flex items-center justify-center gap-2"
                >
                    Start Practice
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        );
    }

    // --- SCREEN: EXERCISE ---
    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(`/course/${courseId}`)} className="text-slate-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-linear-to-r from-sky-500 to-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <span className="text-slate-400 text-sm">{exerciseIdx + 1}/{currentQuestions.length}</span>
            </div>

            <div className="mb-8">
                {renderExercise()}
            </div>

            {answered && (
                <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                    <div className={`font-semibold mb-1 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isCorrect ? '✓ Correct!' : '✗ Not quite'}
                    </div>
                    {exercise?.explanation && (
                        <p className="text-slate-300 text-sm">{exercise.explanation}</p>
                    )}
                </div>
            )}

            {answered && (
                <div className="flex gap-3">
                    <button
                        onClick={handleContinue}
                        className="flex-1 py-4 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-500 transition-colors flex items-center justify-center gap-2"
                    >
                        Continue
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}