import { useState } from 'react';
import type { FillBlankExercise } from '../../types';

interface Props {
  exercise: FillBlankExercise;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

export default function FillBlank({ exercise, onAnswer, answered }: Props) {
  const [input, setInput] = useState('');

  const isCorrect = exercise.answers.some(
    ans => ans.toLowerCase() === input.trim().toLowerCase()
  );

  const handleCheck = () => {
    if (!input.trim()) return;
    onAnswer(isCorrect);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !answered) {
      handleCheck();
    }
  };

  const parts = exercise.question.split('___');

  return (
    <div>
      <h2 className="text-xl text-white font-semibold mb-6">
        Fill in the blank
      </h2>
      
      <div className="text-lg text-slate-300 mb-6 leading-relaxed">
        {parts[0]}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={answered}
          placeholder="type here"
          className={`mx-1 px-3 py-1 rounded-lg border-2 bg-slate-800 text-white outline-none w-40 text-center ${
            answered
              ? isCorrect
                ? 'border-emerald-500 text-emerald-400'
                : 'border-red-500 text-red-400'
              : 'border-slate-600 focus:border-sky-500'
          }`}
        />
        {parts[1]}
      </div>

      {answered && !isCorrect && (
        <p className="text-slate-400 text-sm mb-4">
          Accepted answers: {exercise.answers.join(', ')}
        </p>
      )}

      {!answered && (
        <button
          onClick={handleCheck}
          disabled={!input.trim()}
          className="w-full py-4 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Check Answer
        </button>
      )}
    </div>
  );
}