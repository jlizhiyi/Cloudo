import { useState } from 'react';
import type { MultipleChoiceExercise } from '../../types';

interface Props {
  exercise: MultipleChoiceExercise;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

export default function MultipleChoice({ exercise, onAnswer, answered }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
  };

  const handleCheck = () => {
    if (selected === null) return;
    onAnswer(selected === exercise.correct);
  };

  return (
    <div>
      <h2 className="text-xl text-white font-semibold mb-6">{exercise.question}</h2>
      
      <div className="space-y-3 mb-6 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
        {exercise.options.map((option, idx) => {
          let style = 'bg-slate-800 border-slate-700 text-white hover:border-slate-500';
          
          if (answered) {
            if (idx === exercise.correct) {
              style = 'bg-emerald-500/20 border-emerald-500 text-emerald-400';
            } else if (idx === selected) {
              style = 'bg-red-500/20 border-red-500 text-red-400';
            }
          } else if (selected === idx) {
            style = 'bg-sky-500/20 border-sky-500 text-sky-400';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={answered}
              className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${style}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {!answered && (
        <button
          onClick={handleCheck}
          disabled={selected === null}
          className="w-full py-4 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Check Answer
        </button>
      )}
    </div>
  );
}