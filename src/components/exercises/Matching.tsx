import { useState, useMemo, useEffect } from 'react';
import type { MatchingExercise } from '../../types';

interface Props {
  exercise: MatchingExercise;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

interface Selection {
  side: 'left' | 'right';
  idx: number;
}

interface MatchPair {
  left: number;
  right: number;
}

export default function Matching({ exercise, onAnswer, answered }: Props) {
  const [selected, setSelected] = useState<Selection | null>(null);
  const [matched, setMatched] = useState<MatchPair[]>([]);
  const [wrongPair, setWrongPair] = useState<MatchPair | null>(null);

  const shuffledRight = useMemo(() => {
    const indices = exercise.pairs.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, [exercise.pairs]);

  const allMatched = matched.length === exercise.pairs.length;

  useEffect(() => {
    if (allMatched && !answered) {
      const timer = setTimeout(() => onAnswer(true), 300);
      return () => clearTimeout(timer);
    }
  }, [allMatched, answered, onAnswer]);

  const handleSelect = (side: 'left' | 'right', idx: number) => {
    if (answered || matched.some(m => m[side] === idx)) return;
    
    setWrongPair(null);
    
    if (!selected) {
      setSelected({ side, idx });
    } else if (selected.side === side) {
      setSelected({ side, idx });
    } else {
      const leftIdx = side === 'left' ? idx : selected.idx;
      const rightIdx = side === 'right' ? idx : selected.idx;
      const actualRightIdx = shuffledRight[rightIdx];
      
      if (leftIdx === actualRightIdx) {
        setMatched(prev => [...prev, { left: leftIdx, right: rightIdx }]);
      } else {
        setWrongPair({ left: leftIdx, right: rightIdx });
        setTimeout(() => setWrongPair(null), 600);
      }
      setSelected(null);
    }
  };

  const isMatched = (side: 'left' | 'right', idx: number) => 
    matched.some(m => m[side] === idx);
  
  const isSelected = (side: 'left' | 'right', idx: number) => 
    selected?.side === side && selected?.idx === idx;
  
  const isWrong = (side: 'left' | 'right', idx: number) => 
    wrongPair !== null && wrongPair[side] === idx;

  const getStyle = (side: 'left' | 'right', idx: number) => {
    if (isMatched(side, idx)) return 'bg-emerald-500/20 border-emerald-500 text-emerald-400';
    if (isWrong(side, idx)) return 'bg-red-500/20 border-red-500 text-red-400 animate-pulse';
    if (isSelected(side, idx)) return 'bg-sky-500/20 border-sky-500 text-sky-400';
    return 'bg-slate-800 border-slate-700 text-white hover:border-slate-500';
  };

  return (
    <div>
      <h2 className="text-xl text-white font-semibold mb-6">{exercise.question}</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {exercise.pairs.map(([left], idx) => (
            <button
              key={idx}
              onClick={() => handleSelect('left', idx)}
              disabled={isMatched('left', idx)}
              className={`w-full p-3 rounded-xl border-2 text-sm font-medium transition-all ${getStyle('left', idx)}`}
            >
              {left}
            </button>
          ))}
        </div>
        
        <div className="space-y-2">
          {shuffledRight.map((actualIdx, displayIdx) => (
            <button
              key={displayIdx}
              onClick={() => handleSelect('right', displayIdx)}
              disabled={isMatched('right', displayIdx)}
              className={`w-full p-3 rounded-xl border-2 text-sm font-medium transition-all ${getStyle('right', displayIdx)}`}
            >
              {exercise.pairs[actualIdx][1]}
            </button>
          ))}
        </div>
      </div>

      <p className="text-slate-500 text-sm text-center mt-4">
        Tap items to match them
      </p>
    </div>
  );
}