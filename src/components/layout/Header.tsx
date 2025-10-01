import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-100 border-b border-gray-200 shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-blue-800">Servilleta</Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/index" className="hover:text-blue-800">Índice</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
