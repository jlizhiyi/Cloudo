import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { courses } from '../data/courses';
import type { CourseProgress } from '../types';

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Your Courses</h1>
      <p className="text-slate-400 mb-6">Choose a certification to study</p>
      
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {Object.entries(courses).map(([id, course]) => {
          const saved = localStorage.getItem(`cloudo-progress-${id}`);
          const progress: CourseProgress = saved ? JSON.parse(saved) : {};
          const totalLessons = course.units.reduce((acc, u) => acc + u.lessons.length, 0);
          const completedLessons = Object.values(progress).filter(p => p?.completed).length;
          const pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
          
          return (
            <Link
              key={id}
              to={`/course/${id}`}
              className="block bg-slate-800 rounded-xl p-4 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                  style={{ backgroundColor: course.color + '20' }}
                >
                  {course.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-semibold truncate">{course.title}</h2>
                  <p className="text-slate-400 text-sm truncate">{course.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-1.5 flex-1 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-linear-to-r from-sky-500 to-blue-500 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-slate-500 text-xs">{pct}%</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500" />
              </div>
            </Link>
          );
        })}
      </div>
      
      <p className="text-slate-500 text-sm text-center mt-8">
        More courses coming soon
      </p>
    </div>
  );
}