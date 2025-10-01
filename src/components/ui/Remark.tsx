import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function Remark({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center rounded-md gap-2 bg-blue-100 p-4 mt-4">
      <div>
        <Lightbulb />
      </div>
      <div className="not-prose">
        {children}
      </div>
    </div>
  )
}
