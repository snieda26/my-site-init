#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

// Get URL from command line argument
const url = process.argv[2] || 'https://www.hackfrontend.com/en/docs/html-and-css/reset-normalize';
const outputDir = process.argv[3] || path.join(__dirname, '../parsed-posts');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}

function extractContent(html) {
  // Extract title from h1 with class text-3xl
  const titleMatch = html.match(/<h1[^>]*class="[^"]*text-3xl[^"]*"[^>]*>(.*?)<\/h1>/s);
  const title = titleMatch ? cleanText(titleMatch[1]) : 'No title found';
  
  // Extract breadcrumb to determine category
  const breadcrumbMatch = html.match(/<nav[^>]*aria-label="breadcrumb"[^>]*>(.*?)<\/nav>/s);
  let category = 'general';
  if (breadcrumbMatch) {
    const categoryMatch = breadcrumbMatch[1].match(/<a[^>]*href="[^"]*\/docs\/([^"\/]+)"[^>]*>(.*?)<\/a>/);
    if (categoryMatch) {
      category = categoryMatch[1];
    }
  }
  
  // Extract the typography div content
  const typographyMatch = html.match(/<div[^>]*class="[^"]*typography[^"]*"[^>]*>(.*?)<\/div>\s*<div[^>]*class="[^"]*flex items-center/s);
  
  if (!typographyMatch) {
    return { title, category, content: 'Could not find content' };
  }
  
  let content = typographyMatch[1];
  content = convertToMarkdown(content);
  
  return { title, category, content };
}

function convertToMarkdown(html) {
  let md = html;
  
  // Remove script tags, buttons, and SVGs first
  md = md.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  md = md.replace(/<button[^>]*>.*?<\/button>/gs, '');
  md = md.replace(/<svg[^>]*>.*?<\/svg>/gs, '');
  md = md.replace(/<h1[^>]*>.*?<\/h1>/gs, '');
  
  // Convert code blocks FIRST
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
  
  // Convert inline code
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
  
  // Remove special divs
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
  md = md.replace(/^\s+/gm, '');
  md = md.trim();
  
  return md;
}

function cleanText(text) {
  return text
    .replace(/<[^>]+>/g, '')
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
    .replace(/&#x27;/g, "'")
    .trim();
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Main execution
console.log(`Fetching: ${url}`);

fetchHTML(url)
  .then(html => {
    const result = extractContent(html);
    const filename = slugify(result.title) + '.md';
    const filepath = path.join(outputDir, filename);
    
    // Create markdown with frontmatter
    const markdown = `---
title: "${result.title}"
category: "${result.category}"
url: "${url}"
date: "${new Date().toISOString()}"
---

# ${result.title}

${result.content}
`;
    
    fs.writeFileSync(filepath, markdown, 'utf-8');
    
    console.log(`✓ Successfully parsed!`);
    console.log(`  Title: ${result.title}`);
    console.log(`  Category: ${result.category}`);
    console.log(`  Saved to: ${filepath}`);
  })
  .catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });
