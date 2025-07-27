import React from 'react';

export default function Sentiments() {
  // Sample data with different sentiments
  const sentimentData = [
    { username: 'Hayden', sentiment: 'positive' },
    { username: 'Lara', sentiment: 'neutral' },
    { username: 'Sehwag', sentiment: 'negative' },
    { username: 'Pant', sentiment: 'positive' },
    { username: 'VeryLongUsernameExample', sentiment: 'neutral' },
    { username: 'John', sentiment: 'negative' },
    { username: 'AnotherVeryLongUsernameForTesting', sentiment: 'positive' },
    { username: 'Mike', sentiment: 'neutral' },
    { username: 'Sarah', sentiment: 'negative' },
    { username: 'Alex', sentiment: 'positive' }
  ];

  // Function to get emoji and sentiment text
  const getSentimentEmoji = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return { emoji: '😊', text: 'Positive' };
      case 'negative':
        return { emoji: '😞', text: 'Negative' };
      case 'neutral':
        return { emoji: '😐', text: 'Neutral' };
      default:
        return { emoji: '😐', text: 'Neutral' };
    }
  };

  return (
    <div className="w-65 h-60 mt-3 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Sentiments</h2>
      </div>
      
      {/* Scrollable content */}
      <div className="h-64 overflow-y-auto p-3">
        <div className="divide-y divide-gray-100">
          {sentimentData.map((item, index) => {
            const { emoji, text } = getSentimentEmoji(item.sentiment);
            
            return (
              <div key={index} className="flex items-start justify-between p-3 hover:bg-gray-50 transition-colors duration-150">
                {/* Username with text wrapping */}
                <div className="flex-1 pr-3 min-w-0">
                  <span className="text-sm text-gray-700 break-words word-wrap leading-relaxed block">
                    {item.username}
                  </span>
                </div>
                
                {/* Emoji with hover tooltip */}
                <div className="relative group flex-shrink-0">
                  <span className="text-lg cursor-default">
                    {emoji}
                  </span>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full right-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    {text}
                    <div className="absolute top-full right-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}