import React, { useState } from 'react';
import { Upload, File, FileText, Image, Video, Music, Archive, X, Download } from 'lucide-react';
import './App.css';

const FileUploadManager = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (uploadedFiles) => {
    const newFiles = Array.from(uploadedFiles).map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      file: file,
      uploadDate: new Date().toISOString()
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    if (!selectedFile && newFiles.length > 0) {
      setSelectedFile(newFiles[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files);
    }
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
    if (selectedFile && selectedFile.id === fileId) {
      setSelectedFile(files.find(file => file.id !== fileId) || null);
    }
  };

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
      {/* Upload Area */}
      <div className="upload-section">
        <div 
          className={`upload-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="upload-icon" />
          <h3 className="upload-title">Upload Files</h3>
          <p className="upload-description">
            Drag and drop files here, or click to select files
          </p>
          <input
            type="file"
            multiple
            onChange={handleFileInputChange}
            className="file-input"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="upload-button">
            Choose Files
          </label>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Left Side - File List */}
        <div className="file-list-panel">
          <div className="panel-header">
            <h2 className="panel-title">Files ({files.length})</h2>
          </div>
          
          {files.length === 0 ? (
            <div className="empty-state">
              <File className="empty-icon" />
              <p>No files uploaded yet</p>
            </div>
          ) : (
            <div className="file-list">
              {files.map((file, index) => (
                <div
                  key={file.id}
                  className={`file-item ${selectedFile?.id === file.id ? 'selected' : ''}`}
                  onClick={() => setSelectedFile(file)}
                >
                  <div className="file-item-content">
                    <div className="file-icon-wrapper">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="file-info">
                      <p className="file-label">File {index + 1}</p>
                      <p className="file-name">{file.name}</p>
                      <p className="file-size">{formatFileSize(file.size)}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(file.id);
                      }}
                      className="remove-button"
                    >
                      <X className="remove-icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side - File Details */}
        <div className="file-details-panel">
          {selectedFile ? (
            <div className="file-details">
              <div className="details-header">
                <div className="file-title-section">
                  <div className="file-icon-large">
                    {getFileIcon(selectedFile.type)}
                  </div>
                  <h1 className="file-title">{selectedFile.name}</h1>
                </div>
                <button onClick={downloadFile} className="download-button">
                  <Download className="download-icon" />
                  Download
                </button>
              </div>
              
              <div className="details-grid">
                <div className="details-column">
                  <div className="detail-item">
                    <label className="detail-label">File Size</label>
                    <p className="detail-value">{formatFileSize(selectedFile.size)}</p>
                  </div>
                  
                  <div className="detail-item">
                    <label className="detail-label">File Type</label>
                    <p className="detail-value">{selectedFile.type || 'Unknown'}</p>
                  </div>
                  
                  <div className="detail-item">
                    <label className="detail-label">Upload Date</label>
                    <p className="detail-value">{formatDate(selectedFile.uploadDate)}</p>
                  </div>
                  
                  <div className="detail-item">
                    <label className="detail-label">Last Modified</label>
                    <p className="detail-value">{formatDate(selectedFile.lastModified)}</p>
                  </div>
                </div>
                
                <div className="details-column">
                  <div className="detail-item">
                    <label className="detail-label">File Name</label>
                    <p className="detail-value file-name-full">{selectedFile.name}</p>
                  </div>
                  
                  {selectedFile.type.startsWith('image/') && (
                    <div className="detail-item">
                      <label className="detail-label">Preview</label>
                      <div className="image-preview">
                        <img
                          src={URL.createObjectURL(selectedFile.file)}
                          alt={selectedFile.name}
                          className="preview-image"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <File className="no-selection-icon" />
              <h3>Select a file to view details</h3>
              <p>Choose any file from the list to see its information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploadManager;