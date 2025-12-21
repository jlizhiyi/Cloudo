import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import CoursePath from './pages/CoursePath';
import Lesson from './pages/Lesson';
import UnitQuiz from './pages/UnitQuiz';
import Header from './components/Header';

export default function App() {
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('cloudo-xp');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('cloudo-xp', xp.toString());
  }, [xp]);

  const addXp = (amount: number) => setXp(prev => prev + amount);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900">
        <Header xp={xp} />
        <main className="container mx-auto px-4 py-6 max-w-2xl lg:max-w-4xl xl:max-w-5xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course/:courseId" element={<CoursePath />} />
            <Route path="/course/:courseId/lesson/:lessonId" element={<Lesson addXp={addXp} />} />
            <Route path="/course/:courseId/unit/:unitIdx/quiz" element={<UnitQuiz addXp={addXp} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}