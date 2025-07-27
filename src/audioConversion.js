import {useEffect} from 'react';
import useAudioStore from './store';
const AudioConversion = () => {
  // Default sample data if no conversation data provided
//const conversationData=[];
const conversationData = useAudioStore(state => state.current_transcript)
  const defaultConversation = [
    {
      speaker: 'Krishna',
      text: 'Hello everyone, welcome to today\'s meeting. I hope you all are doing well.',
      timestamp: '00:01'
    },
    {
      speaker: 'Sarah',
      text: 'Thank you Krishna. Yes, we\'re all here and ready to discuss the project updates.',
      timestamp: '00:15'
    },
    {
      speaker: 'Mike',
      text: 'I have prepared the quarterly report and would like to share some key findings with the team.',
      timestamp: '00:32'
    }  ];

  

  //const conversation = conversationData.length > 0 ? conversationData : defaultConversation;

  return (
    <div className="audio-conversion-container">
      <div className="conversion-info">
        <div className="info-item">
          <span className="info-label">Total Duration:</span>
          <span className="info-value">12:34</span>
        </div>
        <div className="info-item">
          <span className="info-label">Speakers Detected:</span>
          <span className="info-value">{[...new Set(conversationData?.map(item => item.speaker))].length}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Conversion Status:</span>
          <span className="info-value status-complete">Complete</span>
        </div>
      </div>
      
      <div className="conversation-list">
        {conversationData?.map((item, index) => (
          <div key={index} className="conversation-item">
            <div className="speaker-info">
              <span className="speaker-name">{item.speaker}</span>
              {item.timestamp && (
                <span className="timestamp">{item.timestamp}</span>
              )}
            </div>
            <div className="speaker-text">
              <span className="text-separator">:</span>
              <span className="text-content">{item.text}</span>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .audio-conversion-container {
          max-width: 100%;
          height: 586px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #fafafa;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .conversion-heading {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
          font-size: 1.5em;
          font-weight: bold;
          letter-spacing: 1px;
          border-bottom: 2px solid #28a745;
          padding-bottom: 10px;
        }

        .conversion-info {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 25px;
          padding: 15px;
          background-color: #f0f8ff;
          border-radius: 6px;
          border-left: 4px solid #007bff;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .info-label {
          font-weight: 600;
          color: #555;
        }

        .info-value {
          color: #333;
          font-weight: 500;
        }

        .status-complete {
          color: #28a745;
          font-weight: bold;
        }

        .conversation-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          flex: 1;
          overflow-y: auto;
          padding-right: 10px;
        }

        .conversation-item {
          padding: 15px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-left: 4px solid #007bff;
        }

        .speaker-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .speaker-name {
          font-weight: bold;
          color: #007bff;
          font-size: 1.1em;
        }

        .timestamp {
          font-size: 0.9em;
          color: #666;
          background-color: #f8f9fa;
          padding: 2px 8px;
          border-radius: 12px;
        }

        .speaker-text {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .text-separator {
          color: #666;
          font-weight: bold;
          margin-top: 2px;
        }

        .text-content {
          flex: 1;
          line-height: 1.5;
          color: #333;
          text-align: justify;
        }

        .conversation-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        @media (max-width: 600px) {
          .audio-conversion-container {
            margin: 10px;
            padding: 15px;
          }
          
          .conversion-info {
            flex-direction: column;
            gap: 10px;
          }
          
          .speaker-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default AudioConversion;