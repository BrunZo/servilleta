import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TopicLink from '@/components/ui/TopicLink';
import { getSection } from '@/lib/dataLoader';

interface SectionPageProps {
  params: Promise<{
    section: string;
  }>;
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section: sectionSlug } = await params;
  const section = await getSection(sectionSlug);
  
  if (!section) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link 
          href="/index" 
          className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al Índice
        </Link>
      </nav>

      {/* Section Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">{section.index}</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{section.title}</h1>
            <p className="text-lg text-gray-600 mt-2">{section.description}</p>
          </div>
        </div>
      </header>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {section.notes.map((note, index) => (
          <div 
            key={note.id} 
            className="group border border-gray-200 rounded-xl p-6 bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-600">
                {note.index}
              </div>
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {section.title}
              </div>
            </div>
            
            <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
              {note.title}
            </h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              {note.description}
            </p>
            
            <TopicLink 
              title="Explorar este tema" 
              href={`/${section.slug}/${note.slug}`}
            />
          </div>
        ))}
      </div>

      {/* Section Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200">
        <div className="text-center text-gray-500">
          <p className="mb-2">
            {section.notes.length} {section.notes.length === 1 ? 'tema' : 'temas'} en esta sección
          </p>
          <p className="text-sm">
            Sección {section.index} • ID: {section.id}
          </p>
        </div>
      </footer>
    </div>
  );
}