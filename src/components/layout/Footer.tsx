import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>© {new Date().getFullYear()} Bruno Martín Ziger</p>
      </div>
    </footer>
  );
};
