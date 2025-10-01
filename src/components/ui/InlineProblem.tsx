import React from 'react';
import MathContent from './MathContent';
import SolutionToggle from './SolutionToggle';

interface InlineProblemProps {
  number: number;
  difficulty: 'easy' | 'medium' | 'hard';
  children: React.Component;
}

export default function InlineProblem({ number, difficulty, children }: InlineProblemProps) {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  const difficultyTexts = {
    easy: 'fácil',
    medium: 'intermedio',
    hard: 'difícil'
  };

  return (
    <div className="not-prose mt-6">
      <span className="font-bold">Problema {number}.</span>
      {children}
    </div>
  );
};
