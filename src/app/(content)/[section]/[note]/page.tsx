import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNote, getSection } from '@/lib/dataLoader';

interface TopicPageProps {
  params: Promise<{
    section: string;
    note: string;
  }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { section: sectionSlug, note: noteSlug } = await params;
  const section = await getSection(sectionSlug);
  const note = await getNote(sectionSlug, noteSlug);

  if (!section || !note) {
    notFound();
  }

  const mdxModule = await import(`@/markdown/${sectionSlug}/${noteSlug}.mdx`);
  const { title: noteTitle, description: noteDescription, default: MDXContent } = mdxModule;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-16 py-6">
          <div className="mb-4">
            <Link href="/index" className="text-blue-600 hover:text-blue-800 transition-colors">
              Índice
            </Link>
            {' > '}
            <Link href={`/${section.slug}`} className="text-blue-600 hover:text-blue-800 transition-colors">
              {section.title}
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{noteTitle}</h1>
              <p className="text-gray-600 mt-1">{noteDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-16 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8 prose prose-lg max-w-none">
          <MDXContent />
        </div>
      </div>
    </div>
  );
}