import React, { useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import Typewriter from 'typewriter-effect';

interface CodeEditorProps {
  activeTab: string;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  onHtmlChange: (value: string) => void;
  onCssChange: (value: string) => void;
  onJsChange: (value: string) => void;
  onTabChange: (tab: string) => void;
  isTyping: boolean;
  onTypingComplete: () => void;
}

export function CodeEditor({
  activeTab,
  htmlCode,
  cssCode,
  jsCode,
  onHtmlChange,
  onCssChange,
  onJsChange,
  onTabChange,
  isTyping,
  onTypingComplete,
}: CodeEditorProps) {
  const tabs = [
    { id: 'html', label: 'HTML' },
    { id: 'css', label: 'CSS' },
    { id: 'js', label: 'JavaScript' },
  ];

  const typewriterRef = useRef<any>(null);

  useEffect(() => {
    if (isTyping && activeTab === 'html') {
      setTimeout(() => {
        onTabChange('css');
      }, htmlCode.length * 1); // Faster typing time
    } else if (isTyping && activeTab === 'css') {
      setTimeout(() => {
        onTabChange('js');
      }, cssCode.length * 1); // Faster typing time
    }
  }, [isTyping, activeTab, htmlCode.length, cssCode.length, onTabChange]);

  const renderEditor = (language: string, code: string, onChange: (value: string) => void) => {
    if (isTyping) {
      return (
        <div className="font-mono text-sm whitespace-pre-wrap h-full overflow-auto p-4 bg-white">
          <Typewriter
            onInit={(typewriter) => {
              typewriterRef.current = typewriter;
              typewriter
                .typeString(code)
                .callFunction(() => {
                  if (language === 'js') {
                    onTypingComplete();
                  }
                })
                .start();
            }}
            options={{
              delay: 10, // Faster typing speed
              cursor: '▋',
              deleteSpeed: 10, // Ensure smooth deletion during typing
              loop: false, // No looping, once typed, stop
            }}
          />
        </div>
      );
    }

    return (
      <CodeMirror
        value={code}
        height="100%"
        theme="light"
        extensions={[language === 'html' ? html() : language === 'css' ? css() : javascript()]}
        onChange={onChange}
        className="text-sm"
      />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !isTyping && onTabChange(tab.id)}
              className={`px-4 py-2 rounded-md transition-colors duration-10 ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} ${isTyping ? 'cursor-not-allowed' : ''}`}
              disabled={isTyping}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[500px] overflow-auto p-4">
        {activeTab === 'html' && renderEditor('html', htmlCode, onHtmlChange)}
        {activeTab === 'css' && renderEditor('css', cssCode, onCssChange)}
        {activeTab === 'js' && renderEditor('js', jsCode, onJsChange)}
      </div>
    </div>
  );
}
