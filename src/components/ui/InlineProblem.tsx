import { ReactNode } from 'react';

interface InlineProblemProps {
  children: ReactNode;
  number: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function InlineProblem({ children, number, difficulty }: InlineProblemProps) {
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
