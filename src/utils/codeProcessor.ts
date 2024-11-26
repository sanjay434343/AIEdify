interface CodeBlocks {
  html: string;
  css: string;
  js: string;
}

export function extractCodeBlocks(text: string): CodeBlocks {
  const blocks: CodeBlocks = {
    html: '',
    css: '',
    js: ''
  };

  // Match code blocks with language identifiers
  const codeBlockRegex = /```(?:html|css|javascript|js)\n([\s\S]*?)```/gi;
  const matches = text.matchAll(codeBlockRegex);

  for (const match of matches) {
    const block = match[0];
    const code = match[1].trim();

    if (block.toLowerCase().startsWith('```html')) {
      blocks.html = code;
    } else if (block.toLowerCase().startsWith('```css')) {
      blocks.css = code;
    } else if (block.toLowerCase().startsWith('```js') || block.toLowerCase().startsWith('```javascript')) {
      blocks.js = code;
    }
  }

  // Fallback: If no code blocks found, try to detect by content
  if (!blocks.html && !blocks.css && !blocks.js) {
    const lines = text.split('\n');
    let currentBlock = '';
    
    for (const line of lines) {
      if (line.includes('<') && line.includes('>')) {
        blocks.html += line + '\n';
      } else if (line.includes('{') && (line.includes(':') || line.includes('}'))) {
        blocks.css += line + '\n';
      } else if (line.includes('function') || line.includes('const') || line.includes('let') || line.includes('var')) {
        blocks.js += line + '\n';
      }
    }
  }

  return blocks;
}