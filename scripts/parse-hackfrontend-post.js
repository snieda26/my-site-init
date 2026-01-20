const https = require('https');
const { JSDOM } = require('jsdom');

async function fetchAndParsePost(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const dom = new JSDOM(data);
          const document = dom.window.document;
          
          // Extract title
          const title = document.querySelector('h1.text-3xl')?.textContent || '';
          
          // Extract content from the typography div
          const contentDiv = document.querySelector('.typography');
          
          if (!contentDiv) {
            reject(new Error('Content div not found'));
            return;
          }
          
          // Convert HTML to Markdown
          const markdown = htmlToMarkdown(contentDiv);
          
          resolve({
            title: title.trim(),
            markdown: markdown,
            url: url
          });
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

function htmlToMarkdown(element) {
  let markdown = '';
  
  function processNode(node) {
    if (node.nodeType === 3) { // Text node
      return node.textContent;
    }
    
    if (node.nodeType !== 1) return ''; // Not an element
    
    const tagName = node.tagName.toLowerCase();
    let result = '';
    
    switch (tagName) {
      case 'h1':
        result = `# ${node.textContent.trim()}\n\n`;
        break;
      case 'h2':
        result = `## ${node.textContent.trim()}\n\n`;
        break;
      case 'h3':
        result = `### ${node.textContent.trim()}\n\n`;
        break;
      case 'h4':
        result = `#### ${node.textContent.trim()}\n\n`;
        break;
      case 'p':
        const pText = Array.from(node.childNodes).map(processNode).join('');
        result = `${pText.trim()}\n\n`;
        break;
      case 'strong':
      case 'b':
        result = `**${node.textContent.trim()}**`;
        break;
      case 'em':
      case 'i':
        result = `*${node.textContent.trim()}*`;
        break;
      case 'code':
        if (node.parentElement?.tagName === 'PRE') {
          // This is a code block, will be handled by PRE
          return node.textContent;
        }
        result = `\`${node.textContent}\``;
        break;
      case 'pre':
        const codeElement = node.querySelector('code');
        const codeText = codeElement ? codeElement.textContent : node.textContent;
        const language = codeElement?.className.match(/language-(\w+)/)?.[1] || '';
        result = `\`\`\`${language}\n${codeText.trim()}\n\`\`\`\n\n`;
        break;
      case 'ul':
      case 'ol':
        const items = Array.from(node.children)
          .filter(child => child.tagName === 'LI')
          .map((li, index) => {
            const bullet = tagName === 'ul' ? '-' : `${index + 1}.`;
            return `${bullet} ${li.textContent.trim()}`;
          })
          .join('\n');
        result = `${items}\n\n`;
        break;
      case 'hr':
        result = '---\n\n';
        break;
      case 'a':
        const href = node.getAttribute('href') || '';
        const linkText = node.textContent.trim();
        if (href && !href.startsWith('#')) {
          result = `[${linkText}](${href})`;
        } else {
          result = linkText;
        }
        break;
      case 'div':
      case 'span':
        // Process children
        result = Array.from(node.childNodes).map(processNode).join('');
        break;
      default:
        // For other elements, just process children
        result = Array.from(node.childNodes).map(processNode).join('');
    }
    
    return result;
  }
  
  return processNode(element).trim();
}

// Example usage
const testUrl = 'https://www.hackfrontend.com/en/docs/html-and-css/reset-normalize';

fetchAndParsePost(testUrl)
  .then(result => {
    console.log('# Post Extracted\n');
    console.log(`**Title:** ${result.title}\n`);
    console.log(`**URL:** ${result.url}\n`);
    console.log('---\n');
    console.log(result.markdown);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
