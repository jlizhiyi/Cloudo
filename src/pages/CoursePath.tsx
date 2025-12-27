import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Lock, CheckCircle, Circle, Zap } from 'lucide-react';
import { courses } from '../data/courses';
import { useProgress } from '../hooks/useProgress';

export default function CoursePath() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? courses[courseId] : undefined;
  const { progress, isLessonUnlocked, isQuizUnlocked, isReviewUnlocked } = useProgress(courseId ?? '');
  
  if (!course) {
    return <div className="text-white">Course not found</div>;
  }

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4" />
        <span>All courses</span>
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <div 
          className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl"
          style={{ backgroundColor: course.color + '20' }}
        >
          {course.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{course.title}</h1>
          <p className="text-slate-400">{course.description}</p>
        </div>
      </div>

      <div className="space-y-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
        {course.units.map((unit, unitIdx) => (
          <div key={unitIdx} className="lg:bg-slate-800/30 lg:rounded-2xl lg:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold">
                {unitIdx + 1}
              </div>
              <div>
                <h2 className="text-white font-semibold">{unit.title}</h2>
                <p className="text-slate-500 text-sm">{unit.lessons.length} lessons</p>
              </div>
            </div>

            <div className="ml-5 border-l-2 border-slate-700 pl-8 space-y-3">
              {unit.lessons.map((lesson, lessonIdx) => {
                const lessonId = `${unitIdx}-${lessonIdx}`;
                const unlocked = isLessonUnlocked(unitIdx, lessonIdx);
                const completed = progress[lessonId]?.completed;

                return (
                  <div key={lessonIdx} className="relative">
                    <div className="absolute -left-[2.35rem] w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-700" />
                    
                    {unlocked ? (
                      <Link
                        to={`/course/${courseId}/lesson/${lessonId}`}
                        className={`block p-4 rounded-xl border transition-all ${
                          completed 
                            ? 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50' 
                            : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-medium">{lesson.title}</h3>
                            <p className="text-slate-400 text-sm">5 exercises</p>
                            {/* NOT {lesson.exercises.length} exercises */}
                          </div>
                          {completed ? (
                            <CheckCircle className="w-6 h-6 text-emerald-500" />
                          ) : (
                            <Circle className="w-6 h-6 text-slate-600" />
                          )}
                        </div>
                      </Link>
                    ) : (
                      <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 opacity-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-slate-400 font-medium">{lesson.title}</h3>
                            <p className="text-slate-500 text-sm">5 exercises</p>
                          </div>
                          <Lock className="w-5 h-5 text-slate-600" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="mt-6 flex flex-col gap-3 w-full max-w-[240px]">
                {isQuizUnlocked(unitIdx) ? (
                  <Link
                    to={`/course/${course.id}/unit/${unitIdx}/quiz`}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all border-b-4 active:border-b-0 active:translate-y-1 ${
                      progress[`unit-quiz-${unitIdx}`]?.completed 
                        ? 'bg-amber-600 border-amber-700 text-white hover:bg-amber-400' 
                        : 'bg-slate-700 border-slate-900 text-slate-200 hover:bg-slate-600'
                    }`}
                  >
                    <CheckCircle className={`w-5 h-5 ${progress[`unit-quiz-${unitIdx}`]?.completed ? 'text-white' : 'text-slate-400'}`} />
                    <span>Unit Quiz</span>
                  </Link>
                ) : (
                  <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 border-b-4 border-slate-900 text-slate-500 opacity-50 cursor-not-allowed">
                    <Lock className="w-5 h-5" />
                    <span>Unit Quiz</span>
                  </div>
                )}
                {isReviewUnlocked(unitIdx) ? (
                  <Link
                    to={`/course/${course.id}/unit/${unitIdx}/review`}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 border-b-4 border-emerald-700 text-white font-bold hover:bg-emerald-400 transition-all active:border-b-0 active:translate-y-1"
                  >
                    <Zap className="w-5 h-5 fill-current" />
                    <span>Review</span>
                  </Link>
                ) : (
                  <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 border-b-4 border-slate-900 text-slate-500 opacity-40 cursor-not-allowed">
                    <Zap className="w-5 h-5" />
                    <span className="text-sm">Review</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}