import React, { useState, useEffect } from 'react';

interface PreviewProps {
  output: string;
}

export function Preview({ output }: PreviewProps) {
  const [iframeKey, setIframeKey] = useState(0); // Key to force iframe reload

  // Function to refresh the iframe
  const handleRefresh = () => {
    setIframeKey(prevKey => prevKey + 1); // Change key to force re-render
  };

  // Function to handle the search tab (add query parameter to URL)
  const handleSearchTab = (searchTerm: string) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('search', searchTerm);
    window.history.pushState({}, '', newUrl.toString()); // Update URL without reloading
  };

  // UseEffect to check for search query and set it in the iframe content (optional feature)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm = searchParams.get('search') || '';
    if (searchTerm) {
      // Handle search term if needed, for now just log it
      console.log('Search term from URL:', searchTerm);
      // You can use this term to update the content inside the iframe or for search functionality
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 px-4 py-2 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Refresh
          </button>
          
        </div>
      </div>
      <div className="h-[500px] bg-white p-4">
        <iframe
          key={iframeKey} // Use the key to force iframe reload
          srcDoc={output}
          title="output"
          className="w-full h-full rounded border border-gray-200"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
}
