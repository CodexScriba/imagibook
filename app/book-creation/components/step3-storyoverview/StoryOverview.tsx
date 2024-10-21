
import React from 'react';

const TextArea: React.FC = () => {
  return (
    <textarea
      className="w-full p-2 border border-gray-300 rounded-md"
      rows={4}
      placeholder="Enter your text here for testing..."
    />
  );
};

export default TextArea;
