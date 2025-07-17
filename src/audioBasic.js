const AudioBasic = ({ details = {} }) => {
  // Default sample data if no details provided
  const defaultDetails = {
    Name: 'Krishna',
    Duration: '3:45',
    Format: 'MP3',
    Bitrate: '320 kbps',
    Size: '8.5 MB',
    Artist: 'Unknown',
    Album: 'My Collection'
  };

  const audioData = Object.keys(details).length > 0 ? details : defaultDetails;

  return (
    <div className="audio-details-container">
      <h2 className="audio-details-heading">AUDIO DETAILS</h2>
      <div className="details-list">
        {Object.entries(audioData).map(([label, value]) => (
          <div key={label} className="detail-item">
            <span className="detail-label">{label}</span>
            <span className="detail-separator">:</span>
            <span className="detail-value">{value}</span>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .audio-details-container {
          max-width: 400px;
          margin: 20px auto;
          margin-top:36px;
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
          font-size: 1.5em;
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