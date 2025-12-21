import { useState, useEffect, useCallback } from 'react';
import { courses } from '../data/courses';
import type { CourseProgress } from '../types';

export function useProgress(courseId: string) {
  const storageKey = `cloudo-progress-${courseId}`;
  
  const [progress, setProgress] = useState<CourseProgress>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, storageKey]);

  const markCompleted = useCallback((lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      [lessonId]: { completed: true, completedAt: Date.now() }
    }));
  }, []);

  const markQuizCompleted = useCallback((unitIdx: number) => {
    const key = `unit-quiz-${unitIdx}`;
    setProgress(prev => ({
      ...prev,
      [key]: { completed: true, completedAt: Date.now() }
    }));
  }, []);

  const isLessonUnlocked = useCallback((unitIdx: number, lessonIdx: number): boolean => {
    if (unitIdx === 0 && lessonIdx === 0) return true;
    
    const course = courses[courseId];
    if (!course) return false;

    let prevUnitIdx = unitIdx;
    let prevLessonIdx = lessonIdx - 1;
    
    if (prevLessonIdx < 0) {
      prevUnitIdx -= 1;
      if (prevUnitIdx < 0) return true;
      prevLessonIdx = course.units[prevUnitIdx].lessons.length - 1;
    }

    const prevLessonId = `${prevUnitIdx}-${prevLessonIdx}`;
    // If crossing a unit boundary, require that the previous unit's quiz is completed
    if (prevLessonIdx === courses[courseId].units[prevUnitIdx].lessons.length - 1 && prevUnitIdx !== unitIdx) {
      const quizKey = `unit-quiz-${prevUnitIdx}`;
      return progress[prevLessonId]?.completed === true && progress[quizKey]?.completed === true;
    }

    return progress[prevLessonId]?.completed === true;
  }, [courseId, progress]);

  const isQuizUnlocked = useCallback((unitIdx: number): boolean => {
    const course = courses[courseId];
    if (!course) return false;
    const unit = course.units[unitIdx];
    if (!unit) return false;
    // quiz unlocked when the last lesson in the same unit is completed
    const lastLessonIdx = unit.lessons.length - 1;
    const lastLessonId = `${unitIdx}-${lastLessonIdx}`;
    return progress[lastLessonId]?.completed === true;
  }, [courseId, progress]);

  const resetProgress = useCallback(() => {
    setProgress({});
  }, []);

  return { progress, markCompleted, markQuizCompleted, isLessonUnlocked, isQuizUnlocked, resetProgress };
}