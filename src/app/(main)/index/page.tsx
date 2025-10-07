import React from 'react';
import Timeline from '@/components/ui/Timeline';
import { getSections } from '@/lib/dataLoader';

export default async function Page() {
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
      <div className="container mx-auto px-4 py-8">
        <Timeline items={timelineItems}/>
      </div>
    </div>
  );
}
