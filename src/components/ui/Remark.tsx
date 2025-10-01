import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function Remark({ children }) {
  return (
    <div className="flex items-center gap-2 bg-blue-100 p-4">
      <div>
        <Lightbulb />
      </div>
      <div className="not-prose">
        {children}
      </div>
    </div>
  )
}
