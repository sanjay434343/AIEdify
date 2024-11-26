import React from 'react';
import { Code2, Play, Download } from 'lucide-react';

interface NavbarProps {
  onRun: () => void;
  onDownload: () => void;
}

export function Navbar({ onRun, onDownload }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Code2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">AIEdify</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onDownload}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md border border-gray-300 hover:border-gray-400 bg-white transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={onRun}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              <Play className="w-4 h-4" />
              <span>Run</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}