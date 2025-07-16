import React, { useState } from 'react';
import { Upload, File, FileText, Image, Video, Music, Archive, X, Download } from 'lucide-react';
import AudioUploader from './audioUpload';
import AudioList from './audioList';
import './App.css';

const FileUploadManager = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <Image className="file-icon" />;
    if (type.startsWith('video/')) return <Video className="file-icon" />;
    if (type.startsWith('audio/')) return <Music className="file-icon" />;
    if (type.includes('text') || type.includes('json') || type.includes('xml')) return <FileText className="file-icon" />;
    if (type.includes('zip') || type.includes('rar') || type.includes('tar')) return <Archive className="file-icon" />;
    return <File className="file-icon" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const downloadFile = () => {
    if (!selectedFile) return;
    const url = URL.createObjectURL(selectedFile.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

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