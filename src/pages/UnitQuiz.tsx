import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { X, ArrowRight, CheckCircle } from 'lucide-react'; // Removed RotateCcw
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

export default function UnitQuiz({ addXp }: Props) {
  const { courseId, unitIdx } = useParams<{ courseId: string; unitIdx: string }>();
  const navigate = useNavigate();

  const course = courseId ? courses[courseId] : undefined;
  const unit = course && unitIdx ? course.units[Number(unitIdx)] : undefined;
  const { markQuizCompleted, isQuizUnlocked } = useProgress(courseId ?? '');

  const [questions, setQuestions] = useState<Exercise[]>([]);
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [complete, setComplete] = useState(false);
  const PASS_PERCENT = 0.7; // require 70% correct to pass

  useEffect(() => {
    if (!unit) return;
    // gather pool across lessons
    const pool: Exercise[] = unit.lessons.flatMap(l => l.exercises ?? []);
    const pick = sample(pool, 10);
    setQuestions(shuffle(pick));
    setIdx(0);
    setAnswered(false);
    setIsCorrect(false);
    setEarnedXp(0);
    setComplete(false);
    setCorrectCount(0);
  }, [unit?.title]);

  // If quiz is locked, show locked UI
  if (!isQuizUnlocked(Number(unitIdx))) {
    return (
      <div className="text-center text-white">
        <h2 className="text-xl font-semibold mb-4">Unit Quiz Locked</h2>
        <p className="text-slate-400">Complete all lessons in this unit to unlock the unit quiz.</p>
        <div className="mt-6">
          <Link to={`/course/${courseId}`} className="px-4 py-2 bg-slate-700 rounded text-white">Back to Course</Link>
        </div>
      </div>
    );
  }

  if (!unit || !course) return <div className="text-white">Unit not found</div>;

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
      // determine pass/fail
      const passed = questions.length > 0 ? (correctCount / questions.length) >= PASS_PERCENT : false;
      if (passed) {
        if (typeof unitIdx !== 'undefined') {
          markQuizCompleted(Number(unitIdx));
        }
      }
    }
  };

  const renderExercise = () => {
    if (!exercise) return null;
    switch (exercise.type) {
      case 'multiple':
        return <MultipleChoice exercise={exercise} onAnswer={handleAnswer} answered={answered} />;
      case 'matching':
        return <Matching exercise={exercise} onAnswer={handleAnswer} answered={answered} />;
      case 'fillblank':
        return <FillBlank exercise={exercise} onAnswer={handleAnswer} answered={answered} />;
    }
  };

  if (complete) {
    const passed = questions.length > 0 ? (correctCount / questions.length) >= PASS_PERCENT : false;
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Unit Quiz Complete!</h1>
        <p className="text-slate-400 mb-6">You answered {correctCount} / {questions.length} correct ({earnedXp} XP)</p>
        {!passed && (
          <p className="text-red-400 mb-4">You did not reach the required passing score ({Math.round(PASS_PERCENT * 100)}%). Please try again.</p>
        )}
        <div className="flex gap-3">
          <Link
            to={`/course/${courseId}`}
            className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors"
          >
            Back to Course
          </Link>
          <button
            onClick={() => {
              // regenerate
              const pool: Exercise[] = unit.lessons.flatMap(l => l.exercises ?? []);
              const pick = sample(pool, 10);
              setQuestions(shuffle(pick));
              setIdx(0);
              setAnswered(false);
              setIsCorrect(false);
              setEarnedXp(0);
              setCorrectCount(0);
              setComplete(false);
            }}
            className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-500 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Consolidated Header to match Lesson.tsx style and remove duplicates */}
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
        <span className="text-slate-400 text-sm">{idx + 1}/{questions.length}</span>
      </div>

      <div className="mb-8">{renderExercise()}</div>

      {answered && (
        <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <div className={`font-semibold mb-1 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Not quite'}
          </div>
          {exercise.explanation && (
            <p className="text-slate-300 text-sm">{(exercise as any).explanation}</p>
          )}
        </div>
      )}

      {answered && (
        <div className="flex gap-3">
          {/* Retry button removed. Only Continue available. */}
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