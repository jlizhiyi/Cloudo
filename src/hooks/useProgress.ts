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
    return progress[prevLessonId]?.completed === true;
  }, [courseId, progress]);

  const resetProgress = useCallback(() => {
    setProgress({});
  }, []);

  return { progress, markCompleted, isLessonUnlocked, resetProgress };
}