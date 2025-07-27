import useAudioStore from './store';
const AudioConversion = () => {
  // Default sample data if no conversation data provided
//const conversationData=[];

const conversationData = useAudioStore(state => state.current_transcript)
const totalSpeakers = conversationData ? [...new Set(conversationData.map(item => item.speaker))].length : 0;
  const getSentimentEmoji = (sentiment) => {
    switch (sentiment) {
      case 'Positive':
        return { emoji: '😊', text: 'Positive' };
      case 'Negative':
        return { emoji: '😞', text: 'Negative' };
      case 'Neutral':
        return { emoji: '😐', text: 'Neutral' };
      default:
        return { emoji: '😐', text: 'Neutral' };
    }
  };

  const getIntentColor = (intent) => {
    const colors = {
      Complaint: 'text-orange-700 bg-orange-100 border-orange-300',
      Greeting: 'text-blue-700 bg-blue-100 border-blue-300',
      Gratitude: 'text-purple-700 bg-purple-100 border-purple-300',
      Resolution: 'text-indigo-700 bg-indigo-100 border-indigo-300',
      Satisfaction: 'text-emerald-700 bg-emerald-100 border-emerald-300',
      Inquiry: 'text-cyan-700 bg-cyan-100 border-cyan-300',
      Feedback: 'text-teal-700 bg-teal-100 border-teal-300'
    };
    return colors[intent] || 'text-gray-700 bg-gray-100 border-gray-300';
  };
  
  
  return (
    <div className="max-w-4xl mx-auto bg-white">
      
      {/* Speaker Count Section */}
      <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="text-center">
          <span className="text-sm text-gray-600 mr-2">Number of Speakers:</span>
          <span className="text-lg font-bold text-blue-600">{totalSpeakers}</span>
        </div>
      </div>
      
      <div className="conversation-list space-y-4">
        {conversationData?.map((item, index) => (
          <div key={index} className="conversation-item bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            
            {/* Header with speaker info and metadata */}
            <div className="flex items-center justify-between mb-3">
              <div className="speaker-info flex items-center space-x-3">
                <span className="speaker-name font-semibold text-gray-800 text-lg">
                  {item.speaker}
                </span>
                
                {/* Intent and Sentiment badges near speaker name */}
                <div className="flex items-center space-x-2">
                  <span title={item.intent.reasoning} className={`cursor-pointer
 intent-badge px-2 py-1 rounded-full text-xs font-medium border ${getIntentColor(item.intent.name)}`}>
                    {item.intent.name}
                  </span>
                  <span title={item.sentiment.reasoning} className={`cursor-pointer
 sentiment-badge px-2 py-1 rounded-full text-xs font-medium border ${getSentimentEmoji(item.sentiment.label)}`}>
                    {item.sentiment.label}
                  </span>
                </div>
              </div>
              
              {/* Timestamp on the right */}
              {item.timestamp && (
                <span className="timestamp text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                  {item.timestamp}
                </span>
              )}
            </div>
            
            {/* Message content */}
            <div className="speaker-text flex items-start">
              <span className="text-separator text-gray-400 mr-2 mt-1">:</span>
              <span className="text-content text-gray-700 leading-relaxed flex-1">
                {item.text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioConversion;