import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Mail, Lock, UploadCloud } from 'lucide-react';
import { useToast } from './ui/Toast';
import api from '../lib/api';

export default function AuthView({ mode = 'login', onLogin }) {
  const isLogin = mode === 'login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return addToast('Please fill all fields', 'error');

    setIsLoading(true);
    try {
      if (isLogin) {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        onLogin();
        addToast('Welcome back!', 'success');
      } else {
        await api.post('/auth/register', { email, password });
        addToast('Registration successful! Please log in.', 'success');
        navigate('/login');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Authentication failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <Link 
          to="/"
          className="absolute top-4 left-4 z-20 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm font-medium"
        >
          &larr; Back
        </Link>

        <div className="relative z-10 flex flex-col items-center mb-8 mt-4">
          <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-xl mb-4 border border-primary/20">
            <UploadCloud className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-muted-foreground text-sm mt-2 text-center">
            {isLogin ? 'Enter your details to access your dashboard.' : 'Start storing your media assets securely.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-input border border-border rounded-md pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-input border border-border rounded-md pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md py-2.5 flex items-center justify-center transition-colors disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="relative z-10 mt-6 text-center">
          <Link
            to={isLogin ? "/signup" : "/login"}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </Link>
        </div>
      </div>
    </div>
  );
}
