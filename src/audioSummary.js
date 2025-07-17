import React from 'react';

const Summary = ({ summaryText = "" }) => {
  // Default summary text if none provided
  const defaultSummary = `This audio conversion session captured a productive team meeting where Krishna led discussions about project updates and quarterly performance. The conversation involved three main participants: Krishna as the meeting facilitator, Sarah who contributed insights about process improvements, and Mike who presented detailed quarterly report findings. Key topics covered included sales performance metrics, team coordination strategies, and future planning initiatives. The session demonstrated effective communication patterns with clear speaker transitions and collaborative dialogue. All participants actively engaged in the discussion, contributing valuable perspectives on current project status and upcoming milestones. The meeting concluded with actionable items and clear next steps for the team.`;

  const displayText = summaryText || defaultSummary;

  return (
    <div className="summary-container">
      <h2 className="summary-heading">SUMMARY/INTENT</h2>
      <div className="summary-content">
        <p className="summary-text">{displayText}</p>
      </div>
      
      <style jsx>{`
        .summary-container {
          width: 99%;
          height: 250px;
          margin: 20px auto;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f8f9fa;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .summary-heading {
          text-align: center;
          margin: 0 0 15px 0;
          color: #333;
          font-size: 1.4em;
          font-weight: bold;
          letter-spacing: 1px;
          border-bottom: 2px solid #6c757d;
          padding-bottom: 8px;
          flex-shrink: 0;
        }

        .summary-content {
          flex: 1;
          overflow-y: auto;
          padding-right: 10px;
        }

        .summary-text {
          margin: 0;
          line-height: 1.6;
          color: #444;
          text-align: justify;
          font-size: 0.95em;
          word-spacing: 1px;
        }

        /* Custom scrollbar styling */
        .summary-content::-webkit-scrollbar {
          width: 6px;
        }

        .summary-content::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .summary-content::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }

        .summary-content::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        /* Hover effect for the entire container */
        .summary-container:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease;
        }

        @media (max-width: 768px) {
          .summary-container {
            margin: 10px auto;
            padding: 15px;
          }
          
          .summary-heading {
            font-size: 1.2em;
            margin-bottom: 10px;
          }
          
          .summary-text {
            font-size: 0.9em;
            line-height: 1.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Summary;