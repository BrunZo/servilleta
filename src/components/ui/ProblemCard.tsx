import React from 'react';
import MathContent from './MathContent';
import SolutionToggle from './SolutionToggle';

interface ProblemCardProps {
  number: number;
  difficulty: 'easy' | 'medium' | 'hard';
  children: React.Component
}

export default function ProblemCard({ number, difficulty, children }: ProblemCardProps) {
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
    <div className="border rounded-lg shadow-sm overflow-hidden mt-6">
      <div className="flex items-center p-4 bg-gray-50">
        <span className="text-xl font-bold flex-1">Problema {number}</span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[difficulty]}`}>
          {difficultyTexts[difficulty]}
        </span>
      </div>
      
      <div className="p-4 bg-white not-prose">
        {children}
      </div>
    </div>
  );
};
