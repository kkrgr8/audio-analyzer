import React, { useState } from 'react';
import AudioUploader from './audioUpload';
import AudioList from './audioList';
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
          WOrk In progress ..
        </div>
      </div>
    </div>
  );
};

export default FileUploadManager;