import React, { useState } from 'react';

const TranslationComponent: React.FC = () => {
  const [totalTime, setTotalTime] = useState<number | null>(null);

  const handleTranslate = async (text: string) => {
    const startTime = performance.now();

    try {
      const response = await fetch('/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const serverProcessingTime = parseFloat(response.headers.get('X-Processing-Time') || '0');
      
      // Handle the streaming response here
      // ...

      const endTime = performance.now();
      const clientTime = (endTime - startTime) / 1000; // Convert to seconds
      const totalTime = clientTime + serverProcessingTime;
      
      setTotalTime(totalTime);
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  return (
    <div>
      {/* Your existing UI components */}
      {totalTime !== null && (
        <p>Total processing time: {totalTime.toFixed(3)} seconds</p>
      )}
    </div>
  );
};

export default TranslationComponent;