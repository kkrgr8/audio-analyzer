import React from 'react';
import { Music } from 'lucide-react';

export default function WelcomeComponent() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Music className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Audio Processor
        </h1>
        
        <p className="text-xl text-gray-600">
          Please upload audio to process
        </p>
      </div>
    </div>
  );
}