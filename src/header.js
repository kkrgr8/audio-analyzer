import React from 'react';

export default function Header() {
  return (
    <header className="bg-black h-12 flex items-center justify-center" style={{ height: '50px' }}>
      <h1 className="text-white text-xl font-semibold">
        Audio Transcripter
      </h1>
    </header>
  );
}