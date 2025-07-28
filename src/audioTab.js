import React, { useState } from 'react';
import Summary from './audioSummary';
import AudioConversion from './audioConversion';

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState('transcript');

  return (
    <div className="max-w-4xl max-h-100 bg-white border border-gray-200 rounded-lg shadow-sm" style={{ height: '600px' }}>
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('transcript')}
          className={`flex-1 px-6 py-4 text-sm font-medium text-center transition-colors duration-200 ${
            activeTab === 'transcript'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          Transcript
        </button>
        <button
          onClick={() => setActiveTab('tab2')}
          className={`flex-1 px-6 py-4 text-sm font-medium text-center transition-colors duration-200 ${
            activeTab === 'tab2'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          Summary
        </button>
      </div>

      {/* Tab Content */}
      <div className="h-full overflow-y-auto" style={{ height: 'calc(100% - 60px)' }}>
        {activeTab === 'transcript' && (
          <div className="h-full">
            <div className='audioConversion'><AudioConversion/></div>
          </div>
        )}

        {activeTab === 'tab2' && (
          <div className="h-full">
            <div className='audioSummary'><Summary/></div>
          </div>
        )}
      </div>
    </div>
  );
}