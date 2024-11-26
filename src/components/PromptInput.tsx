import React from 'react';
import { Wand2, RefreshCw, Loader2 } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  loading: boolean;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
  onUpdate: () => void;
}

export function PromptInput({ prompt, loading, onPromptChange, onGenerate, onUpdate }: PromptInputProps) {
  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Enter your prompt here..."
        className="flex-1 bg-white border border-gray-300 text-gray-900 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      />
      <button
        onClick={onUpdate}
        disabled={loading || !prompt}
        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <RefreshCw className="w-5 h-5" />
        )}
      </button>
      <button
        onClick={onGenerate}
        disabled={loading || !prompt}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Wand2 className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
