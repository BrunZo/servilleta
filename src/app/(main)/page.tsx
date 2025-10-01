import React from 'react';
import Link from 'next/link';
import { getSections } from '@/lib/dataLoader';
import HeroSection from '@/components/sections/hero';
import FeaturedSection from '@/components/sections/featured';
import QuickStartSection from '@/components/sections/quickstart';
import CoursePreviewSection from '@/components/sections/course_preview';

export default async function HomePage() {
  const sections = await getSections();
  
  // Get featured sections for quick access
  const featuredSections = sections.slice(0, 3);
  
  // Get quick start notes (first note from each section)
  const quickStartNotes = sections.map(section => ({
    ...section.notes[0],
    sectionTitle: section.title,
    sectionSlug: section.slug
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <FeaturedSection featuredSections={featuredSections} />
      <QuickStartSection quickStartNotes={quickStartNotes} />
      <CoursePreviewSection />

      {/* Call to Action */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de estudiantes que ya están preparándose para las olimpiadas
          </p>
          <Link
            href="/index"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Ver todo el contenido
          </Link>
        </div>
      </div>
    </div>
  );
};