import React, { useEffect, useState } from 'react';
import { Copy, ImageIcon, FileVideo, Loader2 } from 'lucide-react';
import { useToast } from '../ui/Toast';
import api from '../../lib/api';

export default function GalleryView() {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const { data } = await api.get('/assets');
      setAssets(data);
    } catch (err) {
      addToast('Failed to load gallery', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    addToast('Copied public URL to clipboard!', 'success');
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="h-20 w-20 bg-secondary/50 rounded-full flex items-center justify-center mb-6">
          <ImageIcon className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">No media yet</h2>
        <p className="text-muted-foreground max-w-sm">
          Upload some files to see them appear here. Images and videos will be displayed in this gallery.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Gallery</h2>
        <p className="text-muted-foreground">Manage and view your uploaded media assets.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {assets.map((asset) => {
          const isVideo = asset.mimeType?.startsWith('video/');
          
          return (
            <div key={asset._id} className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="relative aspect-square bg-secondary flex items-center justify-center overflow-hidden">
                {isVideo ? (
                  <video 
                    src={asset.publicUrl} 
                    className="object-cover w-full h-full"
                    controls
                    controlsList="nodownload"
                    preload="metadata"
                  />
                ) : (
                  <img 
                    src={asset.publicUrl} 
                    alt={asset.filename} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] pointer-events-none">
                  {/* Keep the overlay clear of interactive elements like the copy button */}
                </div>
              </div>
              
              <div className="p-4 flex flex-col gap-2 flex-grow">
                <div className="flex items-start justify-between gap-2">
                  <div className="truncate">
                    <p className="text-sm font-medium text-foreground truncate" title={asset.filename}>
                      {asset.filename}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatSize(asset.fileSize)} • {new Date(asset.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {isVideo ? <FileVideo className="h-4 w-4 text-muted-foreground flex-shrink-0" /> : <ImageIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                </div>
                
                <div className="mt-auto pt-4">
                  <button
                    onClick={() => copyToClipboard(asset.publicUrl)}
                    className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-medium py-2 rounded-md transition-colors"
                  >
                    <Copy className="h-3 w-3" />
                    Copy Public URL
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
