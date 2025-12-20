import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { X, ArrowRight, CheckCircle, RotateCcw, BookOpen } from 'lucide-react';
import { courses } from '../data/courses';
import { useProgress } from '../hooks/useProgress';
import MultipleChoice from '../components/exercises/MultipleChoice';
import Matching from '../components/exercises/Matching';
import FillBlank from '../components/exercises/FillBlank';

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

  if (!lesson) {
    return <div className="text-white">Lesson not found</div>;
  }

  const exercise = lesson.exercises[exerciseIdx];
  const progress = ((exerciseIdx + (answered ? 1 : 0)) / lesson.exercises.length) * 100;

  const handleAnswer = (correct: boolean) => {
    setAnswered(true);
    setIsCorrect(correct);
    if (correct) {
      const xpGain = 10;
      setEarnedXp(prev => prev + xpGain);
      addXp(xpGain);
    }
  };

  const handleContinue = () => {
    if (exerciseIdx < lesson.exercises.length - 1) {
      setExerciseIdx(prev => prev + 1);
      setAnswered(false);
      setIsCorrect(false);
    } else {
      markCompleted(lessonId ?? '');
      setScreen('complete');
    }
  };

  const handleRetry = () => {
    setAnswered(false);
    setIsCorrect(false);
  };

  const renderExercise = () => {
    switch (exercise.type) {
      case 'multiple':
        return (
          <MultipleChoice
            exercise={exercise}
            onAnswer={handleAnswer}
            answered={answered}
          />
        );
      case 'matching':
        return (
          <Matching
            exercise={exercise}
            onAnswer={handleAnswer}
            answered={answered}
          />
        );
      case 'fillblank':
        return (
          <FillBlank
            exercise={exercise}
            onAnswer={handleAnswer}
            answered={answered}
          />
        );
    }
  };

  if (screen === 'complete') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Lesson Complete!</h1>
        <p className="text-slate-400 mb-6">You earned {earnedXp} XP</p>
        
        <div className="flex gap-3">
          <Link
            to={`/course/${courseId}`}
            className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors"
          >
            Back to Course
          </Link>
          <button
            onClick={() => {
              setExerciseIdx(0);
              setAnswered(false);
              setIsCorrect(false);
              setEarnedXp(0);
              setScreen(lesson.intro ? 'intro' : 'exercise');
            }}
            className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-500 transition-colors"
          >
            Practice Again
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'intro' && lesson.intro) {
    return (
      <div className="max-w-2xl mx-auto">
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
          {lesson.intro.content.map((paragraph, idx) => (
            <p key={idx} className="text-slate-300 leading-relaxed">
              {paragraph}
            </p>
          ))}
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
        <span className="text-slate-400 text-sm">{exerciseIdx + 1}/{lesson.exercises.length}</span>
      </div>

      <div className="mb-8">
        {renderExercise()}
      </div>

      {answered && (
        <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <div className={`font-semibold mb-1 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Not quite'}
          </div>
          {exercise.explanation && (
            <p className="text-slate-300 text-sm">{exercise.explanation}</p>
          )}
        </div>
      )}

      {answered && (
        <div className="flex gap-3">
          {!isCorrect && (
            <button
              onClick={handleRetry}
              className="flex-1 py-4 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
          )}
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