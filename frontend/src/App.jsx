import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import LandingPage from './components/LandingPage';
import AuthView from './components/AuthView';
import Dashboard from './components/Dashboard';
import GalleryView from './components/views/GalleryView';
import UploadView from './components/views/UploadView';
import ApiKeysView from './components/views/ApiKeysView';
import api from './lib/api';
import { Loader2 } from 'lucide-react';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await api.get('/auth/me');
      setUser(data);
    } catch (err) {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-background text-primary">
        <Loader2 className="h-10 w-10 animate-spin mb-4" />
        <p className="text-muted-foreground font-medium animate-pulse">Loading DropNode...</p>
      </div>
    );
  }

  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard/gallery" replace /> : <AuthView mode="login" onLogin={checkAuth} />} 
          />
          <Route 
            path="/signup" 
            element={user ? <Navigate to="/dashboard/gallery" replace /> : <AuthView mode="signup" onLogin={checkAuth} />} 
          />
          
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
          >
            <Route index element={<Navigate to="/dashboard/gallery" replace />} />
            <Route path="gallery" element={<GalleryView />} />
            <Route path="upload" element={<UploadView />} />
            <Route path="api-keys" element={<ApiKeysView user={user} />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;

