import { findSection, Note } from "@/lib/dataLoader";
import Link from "next/link";

export default async function QuickStartSection({ 
  quickStartNotes 
}: { 
  quickStartNotes: Note[] 
}) {
  const sectionTitles = await Promise.all(quickStartNotes.map(async (note) => {
    const section = await findSection(note.sectionSlug);
    return section?.title;
  }));
  
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ¿Por dónde empezar?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Recomendamos comenzar con estos temas fundamentales
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {quickStartNotes.map((note, index) => (
            <Link
              key={note.slug}
              href={`/${note.sectionSlug}/${note.slug}`}
              className="group bg-gray-50 rounded-lg p-6 hover:bg-blue-50 transition-all duration-300 border border-gray-200 hover:border-blue-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                  {sectionTitles[index]}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-800 mb-2">
                {note.title}
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-blue-700">
                {note.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}