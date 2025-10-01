import React from 'react';
import Timeline from '@/components/ui/Timeline';
import { getSections } from '@/lib/dataLoader';

export default async function HomePage() {
  const sections = await getSections();
  
  const timelineItems = sections.map((section, sectionIndex) => ({
    title: section.title,
    sectionIndex: sectionIndex + 1,
    subitems: section.notes.map((note) => ({
      title: note.title,
      description: note.description,
      link: `/${section.slug}/${note.slug}`,
    }))
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Índice del Curso
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Explora todos los temas organizados por sección
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Timeline items={timelineItems}/>
      </div>
    </div>
  );
}
