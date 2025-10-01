import fs from 'fs';
import path from 'path';

export interface Problem {
  statement: string;
  solution: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Note {
  id: string;
  title: string;
  slug: string;
  description: string;
  index: number;
  sectionId: string;
  sectionSlug: string;
}

export interface Section {
  id: string;
  title: string;
  slug: string;
  description?: string;
  index: number;
  notes: Note[];
}

// Section configuration with proper ordering and metadata
const SECTION_CONFIG = {
  'ecuaciones': {
    id: 'ecuaciones', 
    title: 'Ecuaciones',
    description: 'Resolución de ecuaciones y representaciones numéricas',
    index: 1
  },
  'contar': {
    id: 'contar',
    title: 'Contar',
    description: 'Fundamentos de combinatoria y técnicas de conteo',
    index: 2
  },
  'medidas': {
    id: 'medidas',
    title: 'Medidas',
    description: 'Geometría, ángulos, áreas y teorema de Pitágoras',
    index: 3
  }
};

// Function to get all sections from the markdown directory
export async function getSections(): Promise<Section[]> {
  const dataDir = path.join(process.cwd(), 'src', 'markdown');
  
  try {
    const entries = fs.readdirSync(dataDir, { withFileTypes: true });
    const sectionDirs = entries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
      .map(entry => entry.name);

    const sections: Section[] = [];

    for (const sectionDir of sectionDirs) {
      const sectionPath = path.join(dataDir, sectionDir);
      const sectionFiles = fs.readdirSync(sectionPath);
      
      // Get section config or create default
      const sectionConfig = SECTION_CONFIG[sectionDir as keyof typeof SECTION_CONFIG] || {
        id: sectionDir,
        title: sectionDir
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        description: '',
        index: 999
      };

      // Filter for MDX files
      const mdxFiles = sectionFiles.filter(file => file.endsWith('.mdx'));
      
      if (mdxFiles.length === 0) continue;

      const notes: Note[] = [];
      
      for (let i = 0; i < mdxFiles.length; i++) {
        const file = mdxFiles[i];
        const filePath = path.join(sectionPath, file);
        
        try {
          // Extract slug from filename (remove .mdx extension)
          const slug = file.replace('.mdx', '');
          
          // Dynamically import the MDX file to get its exports
          const mdxModule = await import(`@/markdown/${sectionDir}/${slug}.mdx`);
          
          notes.push({
            id: `${sectionConfig.id}-${slug}`,
            title: mdxModule.title || slug,
            slug: mdxModule.slug || slug,
            description: mdxModule.description || '',
            index: mdxModule.index || i,
            sectionId: sectionConfig.id,
            sectionSlug: sectionDir
          });
        } catch (error) {
          console.warn(`Error importing ${filePath}:`, error);
          // Fallback to filename-based data
          const slug = file.replace('.mdx', '');
          notes.push({
            id: `${sectionConfig.id}-${slug}`,
            title: slug,
            slug: slug,
            description: '',
            index: i,
            sectionId: sectionConfig.id,
            sectionSlug: sectionDir
          });
        }
      }

      // Sort notes by index
      notes.sort((a, b) => a.index - b.index);
    
      sections.push({
        id: sectionConfig.id,
        title: sectionConfig.title,
        slug: sectionDir,
        description: sectionConfig.description,
        index: sectionConfig.index,
        notes
      });
    }

    // Sort sections by index
    sections.sort((a, b) => a.index - b.index);

    return sections;
  } catch (error) {
    console.error('Error reading data directory:', error);
    return [];
  }
}

// Function to get a specific section
export async function getSection(slug: string): Promise<Section | null> {
  const sections = await getSections();
  return sections.find(section => section.slug === slug) || null;
}

// Function to get a specific note
export async function getNote(sectionSlug: string, noteSlug: string): Promise<Note | null> {
  const section = await getSection(sectionSlug);
  if (!section) return null;
  
  return section.notes.find(note => note.slug === noteSlug) || null;
}

// Function to get all notes across all sections
export async function getAllNotes(): Promise<Note[]> {
  const sections = await getSections();
  return sections.flatMap(section => section.notes);
}

export async function findSection(slug: string): Promise<Section | undefined> {
  const sections = await getSections();
  return sections.find(section => section.slug === slug);
}

// Function to get a section by ID
export async function getSectionById(id: string): Promise<Section | null> {
  const sections = await getSections();
  return sections.find(section => section.id === id) || null;
}

// Function to get a note by ID
export async function getNoteById(id: string): Promise<Note | null> {
  const sections = await getSections();
  for (const section of sections) {
    const note = section.notes.find(note => note.id === id);
    if (note) return note;
  }
  return null;
}

// Function to get all sections with their metadata
export async function getSectionsMetadata(): Promise<Pick<Section, 'id' | 'title' | 'slug' | 'description' | 'index'>[]> {
  const sections = await getSections();
  return sections.map(section => ({
    id: section.id,
    title: section.title,
    slug: section.slug,
    description: section.description,
    index: section.index
  }));
}
