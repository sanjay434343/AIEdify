import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PromptInput } from './components/PromptInput';
import { CodeEditor } from './components/CodeEditor';
import { Preview } from './components/Preview';
import { generateCode } from './services/gemini';
import { extractCodeBlocks } from './utils/codeProcessor';

function App() {
  const [htmlCode, setHtmlCode] = useState('<!-- Write your HTML here -->');
  const [cssCode, setCssCode] = useState('/* Write your CSS here */');
  const [jsCode, setJsCode] = useState('// Write your JavaScript here');
  const [output, setOutput] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('html');
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleCodeGeneration = async (isUpdate: boolean) => {
    if (!prompt) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const promptText = isUpdate
        ? `Update the following code based on this prompt: ${prompt}\n\nCurrent HTML:\n${htmlCode}\n\nCurrent CSS:\n${cssCode}\n\nCurrent JS:\n${jsCode}`
        : prompt;

      const response = await generateCode(promptText);
      const { html, css, js } = extractCodeBlocks(response);
      
      setIsTyping(true);
      setActiveTab('html');
      
      if (html) setHtmlCode(html);
      if (css) setCssCode(css);
      if (js) setJsCode(js);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsTyping(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => handleCodeGeneration(false);
  const handleUpdate = () => handleCodeGeneration(true);

  const handleTypingComplete = () => {
    setIsTyping(false);
    handleRun();
  };

  const handleRun = () => {
    const combinedOutput = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${cssCode}</style>
        </head>
        <body>${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `;
    setOutput(combinedOutput);
  };

  useEffect(() => {
    // Initial preview
    handleRun();
  }, []); // Run once on mount

  const handleDownload = () => {
    const files = {
      'index.html': htmlCode,
      'style.css': cssCode,
      'script.js': jsCode
    };

    Object.entries(files).forEach(([filename, content]) => {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onRun={handleRun} onDownload={handleDownload} />
      
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <PromptInput
            prompt={prompt}
            loading={loading}
            onPromptChange={setPrompt}
            onGenerate={handleGenerate}
            onUpdate={handleUpdate}
          />
          {error && (
            <div className="mt-2 px-4 py-2 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            activeTab={activeTab}
            htmlCode={htmlCode}
            cssCode={cssCode}
            jsCode={jsCode}
            onHtmlChange={setHtmlCode}
            onCssChange={setCssCode}
            onJsChange={setJsCode}
            onTabChange={setActiveTab}
            isTyping={isTyping}
            onTypingComplete={handleTypingComplete}
          />
          <Preview output={output} />
        </div>
      </div>
    </div>
  );
}

export default App;