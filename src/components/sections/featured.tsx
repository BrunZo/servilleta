import Link from 'next/link';
import { Section } from '@/lib/dataLoader';

export default function FeaturedSection({ 
  featuredSections 
}: { 
  featuredSections: Section[] 
}) {
  return (
    <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Secciones principales
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora las tres secciones fundamentales de las olimpiadas matemáticas
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredSections.map((section, index) => (
            <div key={section.slug} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {section.notes.length} notas disponibles
                </p>
                <div className="space-y-2 mb-6">
                  {section.notes.slice(0, 2).map((note) => (
                    <div key={note.slug} className="text-sm text-gray-500">
                      • {note.title}
                    </div>
                  ))}
                  {section.notes.length > 2 && (
                    <div className="text-sm text-blue-600">
                      +{section.notes.length - 2} más...
                    </div>
                  )}
                </div>
                <Link
                  href={`/${section.slug}`}
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Explorar sección
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}