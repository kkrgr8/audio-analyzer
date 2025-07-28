import React, { useState } from 'react';
import { Upload, Send, FileAudio, X, CheckCircle, AlertCircle } from 'lucide-react';
    import useAudioStore from './store';
import API_URL from './constant';

const AudioUploader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [label, setLabel] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [error, setError] = useState('');
    const { addAudio, getAllAudio } = useAudioStore()

  const openModal = () => {
    setIsModalOpen(true);
    // Reset states when opening modal
    setSelectedFile(null);
    setLabel('');
    setError('');
    setUploadStatus('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setLabel('');
    setError('');
    setUploadStatus('');
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      // Check if it's an audio file
      if (!file.type.startsWith('audio/')) {
        setError('Please select an audio file');
        return;
      }
      
      // Check file size (e.g., max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB');
        return;
      }
      
      setSelectedFile(file);
      setError('');
      setUploadStatus('');
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError('');
    setUploadStatus('');
  };

  const uploadAudio = async () => {
    if (!selectedFile) {
      setError('Please select an audio file first');
      return;
    }

    if (!label.trim()) {
      setError('Please enter a label for the audio file');
      return;
    }

    setUploading(true);
    setError('');
    setUploadStatus('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('label', label.trim());
      
      // Add any additional fields you might need
      formData.append('filename', selectedFile.name);
      formData.append('filesize', selectedFile.size);

      const response = await fetch(API_URL+'/audios', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - let the browser set it with boundary
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result)
      addAudio([result]);
      const allAudios = getAllAudio();
      console.log('All audios via getter:', allAudios);

      setUploadStatus('Audio uploaded successfully!');
      
      // Optional: Auto-close modal after successful upload
      setTimeout(() => {
        closeModal();
      }, 1000);
      
    } catch (err) {
      setError(`Upload failed: ${err.message}`);
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const styles = {
    container: {
      padding: '32px',
    },
    triggerButton: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '12px 24px',
      backgroundColor: '#3b82f6',
      color: 'white',
      fontWeight: '500',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s',
    },
    triggerButtonHover: {
      backgroundColor: '#2563eb',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '16px',
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      width: '100%',
      maxWidth: '28rem',
      maxHeight: '90vh',
      overflowY: 'auto',
    },
    modalHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '24px',
      borderBottom: '1px solid #e5e7eb',
    },
    modalTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0,
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: '#6b7280',
      cursor: 'pointer',
      transition: 'color 0.2s',
    },
    closeButtonHover: {
      color: '#374151',
    },
    modalBody: {
      padding: '24px',
    },
    formGroup: {
      marginBottom: '24px',
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px',
    },
    textInput: {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.875rem',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box',
    },
    textInputFocus: {
      outline: 'none',
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
    fileUploadArea: {
      position: 'relative',
    },
    fileInput: {
      display: 'none',
    },
    fileUploadLabel: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '12px 16px',
      border: '2px dashed #d1d5db',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      color: '#6b7280',
    },
    fileUploadLabelHover: {
      borderColor: '#60a5fa',
      backgroundColor: '#eff6ff',
    },
    selectedFile: {
      padding: '16px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      marginBottom: '24px',
    },
    selectedFileContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    selectedFileInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    selectedFileName: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#1f2937',
      margin: 0,
    },
    selectedFileSize: {
      fontSize: '0.75rem',
      color: '#6b7280',
      margin: 0,
    },
    removeButton: {
      background: 'none',
      border: 'none',
      color: '#ef4444',
      cursor: 'pointer',
      transition: 'color 0.2s',
    },
    removeButtonHover: {
      color: '#dc2626',
    },
    statusMessage: {
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
    },
    successMessage: {
      backgroundColor: '#f0fdf4',
      border: '1px solid #bbf7d0',
      color: '#166534',
    },
    errorMessage: {
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      color: '#dc2626',
    },
    statusText: {
      fontSize: '0.875rem',
      margin: 0,
    },
    apiInfo: {
      padding: '16px',
      backgroundColor: '#eff6ff',
      borderRadius: '8px',
      marginBottom: '24px',
    },
    apiTitle: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#1e40af',
      margin: '0 0 8px 0',
    },
    apiText: {
      fontSize: '0.75rem',
      color: '#2563eb',
      fontFamily: 'monospace',
      margin: '0 0 4px 0',
    },
    modalFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '12px',
      padding: '24px',
      borderTop: '1px solid #e5e7eb',
      backgroundColor: '#f9fafb',
    },
    cancelButton: {
      padding: '8px 16px',
      color: '#374151',
      backgroundColor: '#e5e7eb',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    cancelButtonHover: {
      backgroundColor: '#d1d5db',
    },
    uploadButton: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 16px',
      fontWeight: '500',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    uploadButtonEnabled: {
      backgroundColor: '#3b82f6',
      color: 'white',
    },
    uploadButtonEnabledHover: {
      backgroundColor: '#2563eb',
    },
    uploadButtonDisabled: {
      backgroundColor: '#d1d5db',
      color: '#6b7280',
      cursor: 'not-allowed',
    },
    spinner: {
      animation: 'spin 1s linear infinite',
      borderRadius: '50%',
      height: '16px',
      width: '16px',
      border: '2px solid transparent',
      borderTop: '2px solid currentColor',
      marginRight: '8px',
    },
    icon: {
      width: '16px',
      height: '16px',
      marginRight: '8px',
    },
    centeredContent: {
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      
      {/* Main Upload Button */}
      <div style={styles.centeredContent}>
        <button
          style={styles.triggerButton}
          onClick={openModal}
          onMouseEnter={(e) => Object.assign(e.target.style, styles.triggerButtonHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, styles.triggerButton)}
        >
          <Upload style={styles.icon} />
          Upload
        </button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          {/* Modal Content */}
          <div style={styles.modal}>
            {/* Modal Header */}
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Upload Recording</h2>
              <button
                style={styles.closeButton}
                onClick={closeModal}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.closeButtonHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.closeButton)}
              >
                <X style={{ width: '24px', height: '24px' }} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={styles.modalBody}>
              {/* Label Input Field */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Label *</label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Enter a label for your audio file"
                  style={styles.textInput}
                  onFocus={(e) => Object.assign(e.target.style, styles.textInputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.textInput)}
                />
              </div>

              {/* File Upload Area */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Select Audio File *</label>
                <div style={styles.fileUploadArea}>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileSelect}
                    style={styles.fileInput}
                    id="audio-upload"
                  />
                  <label
                    htmlFor="audio-upload"
                    style={styles.fileUploadLabel}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.fileUploadLabelHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, styles.fileUploadLabel)}
                  >
                    <Upload style={styles.icon} />
                    <span>
                      {selectedFile ? 'Change File' : 'Choose File'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Selected File Info */}
              {selectedFile && (
                <div style={styles.selectedFile}>
                  <div style={styles.selectedFileContent}>
                    <div style={styles.selectedFileInfo}>
                      <FileAudio style={{ ...styles.icon, color: '#3b82f6' }} />
                      <div>
                        <p style={styles.selectedFileName}>{selectedFile.name}</p>
                        <p style={styles.selectedFileSize}>{formatFileSize(selectedFile.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={removeFile}
                      style={styles.removeButton}
                      onMouseEnter={(e) => Object.assign(e.target.style, styles.removeButtonHover)}
                      onMouseLeave={(e) => Object.assign(e.target.style, styles.removeButton)}
                    >
                      <X style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                </div>
              )}

              {/* Status Messages */}
              {uploadStatus && (
                <div style={{ ...styles.statusMessage, ...styles.successMessage }}>
                  <CheckCircle style={styles.icon} />
                  <span style={styles.statusText}>{uploadStatus}</span>
                </div>
              )}

              {error && (
                <div style={{ ...styles.statusMessage, ...styles.errorMessage }}>
                  <AlertCircle style={styles.icon} />
                  <span style={styles.statusText}>{error}</span>
                </div>
              )}

             
            </div>

            {/* Modal Footer */}
            <div style={styles.modalFooter}>
              <button
                onClick={closeModal}
                style={styles.cancelButton}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.cancelButtonHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.cancelButton)}
              >
                Cancel
              </button>
              <button
                onClick={uploadAudio}
                disabled={!selectedFile || !label.trim() || uploading}
                style={{
                  ...styles.uploadButton,
                  ...(!selectedFile || !label.trim() || uploading 
                    ? styles.uploadButtonDisabled 
                    : styles.uploadButtonEnabled)
                }}
                onMouseEnter={(e) => {
                  if (!(!selectedFile || !label.trim() || uploading)) {
                    Object.assign(e.target.style, styles.uploadButtonEnabledHover);
                  }
                }}
                onMouseLeave={(e) => {
                  if (!(!selectedFile || !label.trim() || uploading)) {
                    Object.assign(e.target.style, styles.uploadButtonEnabled);
                  }
                }}
              >
                {uploading ? (
                  <>
                    <div style={styles.spinner}></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Send style={styles.icon} />
                    Upload
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioUploader;