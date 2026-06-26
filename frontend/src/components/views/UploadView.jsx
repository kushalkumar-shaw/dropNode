import React, { useState, useRef } from 'react';
import { UploadCloud, File as FileIcon, X, Loader2, CheckCircle } from 'lucide-react';
import { useToast } from '../ui/Toast';
import api from '../../lib/api';
import { cn } from '../../lib/utils';

export default function UploadView() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef(null);
  const { addToast } = useToast();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    // 10MB limit
    if (selectedFile.size > 10 * 1024 * 1024) {
      return addToast("File is too large. Maximum size is 10MB.", "error");
    }
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    setUploadProgress(0);

    try {
      await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      
      addToast('File uploaded successfully!', 'success');
      setFile(null);
      setUploadProgress(0);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to upload file', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const triggerSelect = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto h-full flex flex-col">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Upload Zone</h2>
        <p className="text-muted-foreground">Upload images and videos up to 10MB.</p>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        {!file ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={cn(
              "relative group flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-2xl transition-all duration-300 ease-in-out bg-card",
              dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-secondary/30"
            )}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={handleChange}
              accept="image/*,video/*"
            />
            
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UploadCloud className={cn("h-10 w-10 transition-colors", dragActive ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
            </div>
            
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Drag & Drop your file here
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
              Supports JPEG, PNG, GIF, WEBP, MP4, MPEG files.
            </p>
            
            <button
              onClick={triggerSelect}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md px-6 py-2.5 transition-colors"
            >
              Select File
            </button>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
            
            <div className="relative mb-6">
              <div className="h-24 w-24 bg-secondary rounded-2xl flex items-center justify-center border border-border">
                {file.type.startsWith('video/') ? (
                  <FileIcon className="h-10 w-10 text-primary" />
                ) : (
                  <ImageIcon className="h-10 w-10 text-primary" />
                )}
              </div>
              {!isUploading && (
                <button 
                  onClick={() => setFile(null)}
                  className="absolute -top-3 -right-3 h-8 w-8 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <h3 className="text-lg font-medium text-foreground truncate max-w-md w-full mb-1">
              {file.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-8">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>

            {isUploading ? (
              <div className="w-full max-w-md space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" /> Uploading...
                  </span>
                  <span className="text-muted-foreground">{uploadProgress}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={handleUpload}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md px-8 py-3 flex items-center gap-2 transition-colors shadow-md shadow-primary/20"
              >
                <UploadCloud className="h-5 w-5" />
                Start Upload
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Quick helper to avoid importing from lucide twice
function ImageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}
