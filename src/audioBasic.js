import useAudioStore from './store';

const AudioBasic = () => {
  const defaultDetails = useAudioStore(state => state.current_audio_basic);
  const intent = useAudioStore(state => state.cuurent_intent); 
  
  return (
    <div className="audio-details-container">
      <h2 className="audio-details-heading">Recording Details</h2>
      <div className="details-list">
        <div className="detail-item">
            <span className="detail-label">Label</span>
            <span className="detail-separator">:</span>
            <span className="detail-value">{defaultDetails.label}</span>
        </div>
        <div className="detail-item">
            <span className="detail-label">Duration</span>
            <span className="detail-separator">:</span>
            <span className="detail-value">{defaultDetails.duration}</span>
        </div>
        <div className="detail-item">
            <span className="detail-label">Size</span>
            <span className="detail-separator">:</span>
            <span className="detail-value">{defaultDetails.size}</span>
        </div>
        <div className="detail-item">
            <span className="detail-label">Intent</span>
            <span className="detail-separator">:</span>
            <span className="detail-value">{intent}</span>
        </div>
        
      </div>
      
      <style jsx>{`
        .audio-details-container {
          max-width: 400px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .audio-details-heading {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
          font-size: 1em;
          font-weight: bold;
          letter-spacing: 1px;
          border-bottom: 2px solid #007bff;
          padding-bottom: 10px;
        }

        .details-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }

        .detail-item:last-child {
          border-bottom: none;
        }

        .detail-label {
          font-weight: 600;
          color: #555;
          min-width: 80px;
          flex-shrink: 0;
        }

        .detail-separator {
          margin: 0 10px;
          color: #777;
          font-weight: bold;
        }

        .detail-value {
          color: #333;
          flex: 1;
          word-break: break-word;
        }

        .detail-item:hover {
          background-color: #f0f0f0;
          border-radius: 4px;
          padding: 8px;
          margin: 0 -8px;
        }

        @media (max-width: 480px) {
          .audio-details-container {
            margin: 10px;
            padding: 15px;
          }
          
          .detail-label {
            min-width: 70px;
          }
        }
      `}</style>
    </div>
  );
};

export default AudioBasic;