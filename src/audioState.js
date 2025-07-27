import React from 'react';

const StatusSpan = ({ status }) => {
  const getStatusClasses = (status) => {
    const baseClasses = "inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold";
    
    switch (status?.toLowerCase()) {
      case 'completed':
        return `${baseClasses} bg-green-500 text-white`;
      case 'inprogress':
        return `${baseClasses} bg-blue-500 text-white`;
      case 'failed':
        return `${baseClasses} bg-red-500 text-white`;
      default:
        return `${baseClasses} bg-gray-400 text-white`;
    }
  };

  const getStatusIcon = (status) => {
    console.log(status)
    switch (status?.toLowerCase()) {
      case 'completed':
        return '✓';
      case 'inprogress':
        return (
          <div className="w-2 h-2 border border-white border-t-transparent rounded-full animate-spin"></div>
        );
      case 'failed':
        return '✕';
      default:
        return '?';
    }
  };

  return (
    <span className={getStatusClasses(status)}>
      {getStatusIcon(status)}
    </span>
  );
};

export default StatusSpan;
