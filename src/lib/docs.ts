import fs from 'fs';
import path from 'path';

export interface DocFrontmatter {
  title: string;
  description?: string;
  section: string;
  slug: string;
  prev?: string | null;
  next?: string | null;
}

export interface DocContent {
  frontmatter: DocFrontmatter;
  content: string;
}

const DOCS_PATH = path.join(process.cwd(), 'src/content/docs');

/**
 * Simple frontmatter parser (YAML-like)
 * Parses the YAML frontmatter block between --- markers
 */
function parseFrontmatter(fileContent: string): { data: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content: fileContent };
  }
  
  const [, frontmatterStr, content] = match;
  const data: Record<string, any> = {};
  
  // Parse YAML-like frontmatter
  const lines = frontmatterStr.split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.slice(0, colonIndex).trim();
    let value: any = line.slice(colonIndex + 1).trim();
    
    // Handle null values
    if (value === 'null' || value === '') {
      value = null;
    }
    // Remove surrounding quotes if present
    else if ((value.startsWith('"') && value.endsWith('"')) || 
             (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    data[key] = value;
  }
  
  return { data, content: content.trim() };
}

/**
 * Get all markdown files in a directory recursively
 */
export function getAllDocSlugs(): { section: string; slug: string }[] {
  const slugs: { section: string; slug: string }[] = [];
  
  try {
    const sections = fs.readdirSync(DOCS_PATH).filter(item => {
      const itemPath = path.join(DOCS_PATH, item);
      return fs.statSync(itemPath).isDirectory();
    });

    for (const section of sections) {
      const sectionPath = path.join(DOCS_PATH, section);
      const files = fs.readdirSync(sectionPath).filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
      
      for (const file of files) {
        const slug = file.replace(/\.(md|mdx)$/, '');
        slugs.push({ section, slug });
      }
    }
  } catch (err) {
    console.error('Error reading docs directory:', err);
  }

  return slugs;
}

/**
 * Get document content by section and slug
 */
export function getDocBySlug(section: string, slug: string): DocContent | null {
  // Try both .md and .mdx extensions
  const extensions = ['.md', '.mdx'];
  
  for (const ext of extensions) {
    const filePath = path.join(DOCS_PATH, section, `${slug}${ext}`);
    
    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = parseFrontmatter(fileContent);
        
        return {
          frontmatter: {
            title: data.title || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            description: data.description,
            section: data.section || section,
            slug: data.slug || slug,
            prev: data.prev,
            next: data.next,
          },
          content,
        };
      }
    } catch (err) {
      console.error(`Error reading doc file ${filePath}:`, err);
    }
  }
  
  return null;
}

/**
 * Get all documents in a section
 */
export function getDocsBySection(section: string): DocContent[] {
  const sectionPath = path.join(DOCS_PATH, section);
  
  try {
    if (!fs.existsSync(sectionPath)) {
      return [];
    }

    const files = fs.readdirSync(sectionPath).filter(file => 
      file.endsWith('.md') || file.endsWith('.mdx')
    );

    const docs: DocContent[] = [];
    
    for (const file of files) {
      const slug = file.replace(/\.(md|mdx)$/, '');
      const doc = getDocBySlug(section, slug);
      if (doc) {
        docs.push(doc);
      }
    }

    return docs;
  } catch (err) {
    console.error('Error reading section docs:', err);
    return [];
  }
}

/**
 * Get all sections with their documents
 */
export function getAllSectionsWithDocs(): { section: string; docs: DocContent[] }[] {
  try {
    const sections = fs.readdirSync(DOCS_PATH).filter(item => {
      const itemPath = path.join(DOCS_PATH, item);
      return fs.statSync(itemPath).isDirectory();
    });

    return sections.map(section => ({
      section,
      docs: getDocsBySection(section),
    }));
  } catch (err) {
    console.error('Error reading all sections:', err);
    return [];
  }
}
