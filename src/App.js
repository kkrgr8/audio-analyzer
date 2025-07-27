import React, { useState } from 'react';
import AudioUploader from './audioUpload';
import AudioList from './audioList';
import AudioBasic from './audioBasic';
import TranscriptionProgress from './audioProgress';
import BasicAudioPlayer from './audioPlayer';
import './App.css';
import WelcomeComponent from './welcome';
import useAudioStore from './store';
import Sentiments from './sentiments';
import TabsComponent from './audioTab';
import Header from './header'

const FileUploadManager = () => {
  const cuurent_audio_id = useAudioStore(state => state.current_audio_id);


  return (
    <div className="file-manager">
     <Header/>
      {/* Main Content Area */}
      <div className="main-content">
        {/* Left Side - File List */}
        <div className="file-list-panel">
          <div className="panel-header">
            <h2 className="panel-title">Upload your Recording</h2>
            <AudioUploader/>
          </div>
          <AudioList/>
        </div>

        {/* Right Side - File Details */}
        {cuurent_audio_id && (
        <div className="file-details-panel">
          <div className='audioProgress'><TranscriptionProgress/></div>
          <div className='audioPlayer'><BasicAudioPlayer/></div>
          <div className='SecondRow'><div className="audioBasic" ><AudioBasic/><Sentiments/></div>
          <div className='audioSummaryConv'><TabsComponent/></div></div>
          
          
        </div>
          )}
          {!cuurent_audio_id && (
         <div  style={{ width: '75%' }}><WelcomeComponent/></div> 
         )}
      </div>
    </div>
  );
};

export default FileUploadManager;