#!/usr/bin/env node

const fs = require('fs');

// Read the HTML file
const html = fs.readFileSync('/tmp/hackfrontend-post.html', 'utf-8');

// Simple regex-based extraction (no dependencies needed)
function extractContent(html) {
  // Extract title from h1 with class text-3xl
  const titleMatch = html.match(/<h1[^>]*class="[^"]*text-3xl[^"]*"[^>]*>(.*?)<\/h1>/s);
  const title = titleMatch ? titleMatch[1].trim() : 'No title found';
  
  // Extract the typography div content
  const typographyMatch = html.match(/<div[^>]*class="[^"]*typography[^"]*"[^>]*>(.*?)<\/div>\s*<div[^>]*class="[^"]*flex items-center/s);
  
  if (!typographyMatch) {
    return { title, content: 'Could not find content' };
  }
  
  let content = typographyMatch[1];
  
  // Convert HTML to a more readable format
  content = convertToMarkdown(content);
  
  return { title, content };
}

function convertToMarkdown(html) {
  let md = html;
  
  // Remove script tags, buttons, and SVGs first
  md = md.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  md = md.replace(/<button[^>]*>.*?<\/button>/gs, '');
  md = md.replace(/<svg[^>]*>.*?<\/svg>/gs, '');
  md = md.replace(/<h1[^>]*>.*?<\/h1>/gs, ''); // Remove h1 since we already have title
  
  // Convert code blocks FIRST (before other replacements)
  md = md.replace(/<div[^>]*class="[^"]*my-5[^"]*"[^>]*>.*?<pre[^>]*>.*?<code[^>]*class="[^"]*language-(\w+)[^"]*"[^>]*>(.*?)<\/code>.*?<\/pre>.*?<\/div>/gs, (match, lang, code) => {
    const cleanCode = cleanCodeText(code);
    return `\n\`\`\`${lang}\n${cleanCode}\n\`\`\`\n\n`;
  });
  
  // Convert headings with links inside
  md = md.replace(/<h2[^>]*>.*?<a[^>]*><\/a>(.*?)<\/h2>/gs, (match, text) => {
    return `\n## ${cleanText(text)}\n\n`;
  });
  md = md.replace(/<h3[^>]*>.*?<a[^>]*><\/a>(.*?)<\/h3>/gs, (match, text) => {
    return `\n### ${cleanText(text)}\n\n`;
  });
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gs, (match, text) => `\n## ${cleanText(text)}\n\n`);
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gs, (match, text) => `\n### ${cleanText(text)}\n\n`);
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gs, (match, text) => `\n#### ${cleanText(text)}\n\n`);
  
  // Convert inline code (after code blocks)
  md = md.replace(/<code[^>]*>(.*?)<\/code>/g, (match, text) => `\`${cleanText(text)}\``);
  
  // Convert strong/bold BEFORE paragraphs
  md = md.replace(/<strong[^>]*>(.*?)<\/strong>/g, (match, text) => `**${cleanText(text)}**`);
  
  // Convert lists
  md = md.replace(/<ul[^>]*>(.*?)<\/ul>/gs, (match, items) => {
    const listItems = items.match(/<li[^>]*>(.*?)<\/li>/gs);
    if (listItems) {
      return '\n' + listItems.map(item => {
        const text = item.replace(/<li[^>]*>(.*?)<\/li>/s, '$1');
        return `- ${cleanText(text)}`;
      }).join('\n') + '\n\n';
    }
    return match;
  });
  
  // Convert paragraphs
  md = md.replace(/<p[^>]*>(.*?)<\/p>/gs, (match, text) => `${cleanText(text)}\n\n`);
  
  // Convert horizontal rules
  md = md.replace(/<hr[^>]*>/g, '\n---\n\n');
  
  // Remove special divs (like the green box at the end)
  md = md.replace(/<div[^>]*class="[^"]*border rounded-md[^"]*"[^>]*>(.*?)<\/div>/gs, (match, content) => {
    return cleanText(content) + '\n\n';
  });
  
  // Remove remaining HTML tags
  md = md.replace(/<\/?div[^>]*>/g, '');
  md = md.replace(/<\/?span[^>]*>/g, '');
  md = md.replace(/<\/?a[^>]*>/g, '');
  md = md.replace(/<\/?nav[^>]*>/g, '');
  md = md.replace(/<\/?ol[^>]*>/g, '');
  md = md.replace(/<\/?li[^>]*>/g, '');
  
  // Clean up whitespace
  md = md.replace(/\n{3,}/g, '\n\n');
  md = md.replace(/^\s+/gm, ''); // Remove leading whitespace on lines
  md = md.trim();
  
  return md;
}

function cleanText(text) {
  return text
    .replace(/<[^>]+>/g, '') // Remove any remaining tags
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanCodeText(text) {
  return text
    .replace(/<span[^>]*>/g, '')
    .replace(/<\/span>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

// Extract and display
const result = extractContent(html);

console.log('# ' + result.title);
console.log('');
console.log(result.content);
