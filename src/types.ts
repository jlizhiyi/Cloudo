export interface MultipleChoiceExercise {
  type: 'multiple';
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export interface MatchingExercise {
  type: 'matching';
  question: string;
  pairs: [string, string][];
  explanation?: string;
}

export interface FillBlankExercise {
  type: 'fillblank';
  question: string;
  answers: string[];
  explanation?: string;
}

export type Exercise = MultipleChoiceExercise | MatchingExercise | FillBlankExercise;

export interface LessonIntro {
  title: string;
  content: string[];
}

export interface Lesson {
  title: string;
  intro?: LessonIntro;
  exercises: Exercise[];
}

export interface Unit {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  units: Unit[];
}

export interface LessonProgress {
  completed: boolean;
  completedAt: number;
}

export type CourseProgress = Record<string, LessonProgress>;