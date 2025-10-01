"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Menu, X, Search, BookOpen, Home } from 'lucide-react';
import { Section, Note } from '@/lib/dataLoader';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ContentsNavbar({ sections } : { sections: Section[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [openSections, setOpenSections] = useState<string[]>(sections.map(s => s.slug));
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredSections, setFilteredSections] = useState<Section[]>(sections);
  const pathname = usePathname();

  // Filter sections based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSections(sections);
      return;
    }

    const filtered = sections.map(section => ({
      ...section,
      notes: section.notes.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(section => section.notes.length > 0);

    setFilteredSections(filtered);
  }, [searchQuery, sections]);

  const toggleSection = (slug: string) => {
    if (openSections.includes(slug)) {
      setOpenSections(openSections.filter(item => item !== slug));
    } else {
      setOpenSections([...openSections, slug]);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActiveNote = (sectionSlug: string, noteSlug: string) => {
    return pathname === `/${sectionSlug}/${noteSlug}`;
  };

  const isActiveSection = (sectionSlug: string) => {
    return pathname === `/${sectionSlug}`;
  };

  const getTotalNotes = () => {
    return sections.reduce((total, section) => total + section.notes.length, 0);
  };

  return (
    <div className="flex flex-col h-screen sticky top-0 z-20 bg-white border-r border-gray-200 shadow-sm w-80">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-lg text-gray-800">Servilleta</span>
        </Link>
        <button 
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors" 
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <Link href="/" className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Servilleta</h1>
            <p className="text-sm text-gray-600">Matemáticas Olímpicas</p>
          </div>
        </Link>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar temas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Mobile Search */}
      <div className="lg:hidden p-4 border-b border-gray-200 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar temas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Navigation Content */}
      <div className={`
        lg:block lg:relative
        ${mobileMenuOpen ? 'block' : 'hidden'}
        fixed lg:static inset-0 z-10 bg-white lg:bg-transparent
      `}>
        <nav className="flex flex-col h-full">
          {/* Main Navigation */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="p-4 space-y-2">
              {/* Home Link */}
              <Link
                href="/"
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  pathname === '/' 
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={closeMobileMenu}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Inicio</span>
              </Link>

              {/* Index Link */}
              <Link
                href="/index"
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  pathname === '/index' 
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={closeMobileMenu}
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">Índice Completo</span>
              </Link>
            </div>

            {/* Sections */}
            <div className="px-4 pb-4 flex-1 min-h-0">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                Secciones ({filteredSections.length})
              </div>
              
              <div className="space-y-1">
                {filteredSections.map((section) => (
                  <div key={section.slug} className="border border-gray-100 rounded-lg overflow-hidden">
                    <button
                      className={`w-full flex items-center justify-between p-3 transition-colors ${
                        isActiveSection(section.slug)
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => toggleSection(section.slug)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                          isActiveSection(section.slug)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {section.index}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{section.title}</div>
                          <div className="text-xs text-gray-500">{section.notes.length} temas</div>
                        </div>
                      </div>
                      {openSections.includes(section.slug) ? (
                        <ChevronUp size={16} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400" />
                      )}
                    </button>
                    
                    {openSections.includes(section.slug) && (
                      <div className="border-t border-gray-100 bg-gray-50">
                        {section.notes.map((note) => (
                          <Link
                            key={note.id}
                            href={`/${section.slug}/${note.slug}`}
                            className={`block p-3 pl-12 text-sm transition-colors border-l-2 ${
                              isActiveNote(section.slug, note.slug)
                                ? 'bg-blue-100 text-blue-700 border-blue-500'
                                : 'text-gray-600 hover:bg-white hover:text-gray-800 border-transparent'
                            }`}
                            onClick={closeMobileMenu}
                          >
                            <div className="font-medium">{note.title}</div>
                            {note.description && (
                              <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {note.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 p-4 flex-shrink-0">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">
                {getTotalNotes()} temas disponibles
              </p>
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} Bruno Martín Ziger
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
