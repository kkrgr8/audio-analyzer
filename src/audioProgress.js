import { useState, useEffect } from 'react';
import { Check, Clock, Play } from 'lucide-react';
import useAudioStore from './store';

const TranscriptionProgress = () => {
  const [currentStep, setCurrentStep] = useState(2); // Example: currently on step 2 (Transcription)
 const defaultDetails = useAudioStore(state => state.current_audio_basic);
 const progress = {
    'audio.upload' : 2,
    'transcript.start':2,
    'transcript.fail':2,
    'transcript.end':2,
    'analysis.start':3,
    'analysis.fail':3,
    'analysis.end':4,
    'summary.start':4,
    'summary.fail':4,
    'summary.end':4
  }
  
 // eslint-disable-next-line react-hooks/exhaustive-deps
 useEffect(() => {
    setCurrentStep(progress[defaultDetails.stage]); 
},[defaultDetails]);


  
  const steps = [
    'File Upload',
    'Transcription Generation',
    'Intent & Sentiment Analysis',
    'Summary Generation'
  ];

  const getStepStatus = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'running';
    return 'pending';
    
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 border-green-300';
      case 'running': return 'text-amber-600 bg-amber-100 border-amber-300';
      case 'pending': return 'text-gray-500 bg-gray-100 border-gray-300';
      default: return 'text-gray-500 bg-gray-100 border-gray-300';
    }
  };

  const getIcon = (status) => {
    switch (status) {
      case 'completed': return <Check size={12} />;
      case 'running': return <Play size={12} />;
      case 'pending': return <Clock size={12} />;
      default: return <Clock size={12} />;
    }
  };

  return (
    <div className="w-full mx-auto p-4" style={{ width: '100%', marginTop:'7px' }}>
         <h2 className="conversion-heading">Pipeline </h2>
      <div className="bg-white rounded-lg shadow-lg p-6" style={{ height: '150px', width: '100%' }}>
        <div className="flex items-center justify-between h-full relative">
          {/* Connecting line background */}
          <div className="absolute top-8 left-4 right-4 h-1 bg-gray-300 rounded-full"></div>
          
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            
            return (
              <div key={index} className="flex flex-col items-center relative z-10">
                {/* Step Circle */}
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 transition-all duration-300 ${getStepColor(status)}`}>
                  {getIcon(status)}
                </div>
                
                {/* Step Label */}
                <div className="text-xs text-center font-medium px-1 leading-tight">
                  <div className={`${status === 'completed' ? 'text-green-600' : status === 'running' ? 'text-amber-600' : 'text-gray-500'}`}>
                    {step}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TranscriptionProgress;