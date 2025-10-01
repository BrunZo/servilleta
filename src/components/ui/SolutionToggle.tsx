"use client";

import React, { useState } from 'react';
import MathContent from './MathContent';

export default function SolutionToggle({ children }: {
  children: string
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 border rounded-lg shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full justify-between bg-blue-50 hover:bg-blue-100 p-3 rounded text-blue-700 font-medium"
      >
        <span>{isOpen ? 'Ocultar solución' : 'Mostrar solución'}</span>
        <svg
          className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
};
