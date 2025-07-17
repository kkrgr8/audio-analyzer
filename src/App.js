import AudioUploader from './audioUpload';
import AudioList from './audioList';
import AudioBasic from './audioBasic';
import AudioConversion from './audioConversion';
import Summary from './audioSummary';
import TranscriptionProgress from './audioProgress';
import BasicAudioPlayer from './audioPlayer';
import './App.css';

const FileUploadManager = () => {
  return (
    <div className="file-manager">
     
      {/* Main Content Area */}
      <div className="main-content">
        {/* Left Side - File List */}
        <div className="file-list-panel">
          <div className="panel-header">
            <h2 className="panel-title">Upload your Audio</h2>
            <AudioUploader/>
          </div>
          <AudioList/>
        </div>

        {/* Right Side - File Details */}
        <div className="file-details-panel">
          <div className='audioProgress'><TranscriptionProgress/></div>
          <div className='audioPlayer'><BasicAudioPlayer/></div>
          <div className="audioBasic"><AudioBasic/></div>
          <div className='audioConversion'><AudioConversion/></div>
          <div className='audioSummary'><Summary/></div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadManager;