import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, UploadCloud, Link as LinkIcon, Key, ArrowRight, Shield, Zap, Layers } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: UploadCloud,
      title: 'Seamless Uploads',
      description: 'Drag and drop your images and videos with instant processing and secure storage.'
    },
    {
      icon: LinkIcon,
      title: 'Instant Public URLs',
      description: 'Get shareable links immediately after upload. Perfect for CDN usage and hotlinking.'
    },
    {
      icon: Key,
      title: 'Developer API',
      description: 'Integrate directly into your applications using secure API keys and standard HTTP requests.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30 selection:text-primary-foreground">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[100px] mix-blend-screen" />
        <div className="absolute -bottom-[30%] left-[20%] w-[80%] h-[80%] rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-primary font-bold text-2xl tracking-tight">
          <Cloud className="h-8 w-8" fill="currentColor" />
          <span>DropNode</span>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            to="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
          >
            Sign In
          </Link>
          <Link 
            to="/signup"
            className="text-sm font-medium bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-5 py-2.5 rounded-full border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-24 pb-32 px-4 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">DropNode v1.0 is live</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          The ultimate self-hosted <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">media storage solution.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-150">
          Upload, manage, and serve your assets instantly. A blazing fast, developer-friendly alternative to enterprise CDNs.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <Link 
            to="/signup"
            className="group flex items-center gap-2 bg-primary text-primary-foreground font-semibold rounded-full px-8 py-4 text-lg transition-all duration-300 hover:bg-primary/90 hover:scale-105 shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.6)]"
          >
            Start For Free
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a 
            href="https://github.com/dropnode" 
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-secondary text-secondary-foreground font-medium rounded-full px-8 py-4 text-lg transition-all duration-300 hover:bg-secondary/80 hover:scale-105 border border-border"
          >
            View on GitHub
          </a>
        </div>
      </main>

      {/* Features Showcase */}
      <section className="relative z-10 py-24 bg-card/30 border-t border-border/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to scale</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Built from the ground up to provide a seamless developer experience with powerful capabilities.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="group relative bg-secondary/30 backdrop-blur-sm border border-border rounded-2xl p-8 hover:bg-secondary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-primary/30 overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="h-14 w-14 bg-card border border-border/50 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Stats / Trust Section */}
      <section className="relative z-10 py-20 border-t border-border/30">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/50">
          <div className="flex flex-col items-center">
            <Layers className="h-6 w-6 text-muted-foreground mb-3" />
            <span className="text-3xl font-bold text-foreground">10MB</span>
            <span className="text-sm text-muted-foreground mt-1">File Limit</span>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="h-6 w-6 text-muted-foreground mb-3" />
            <span className="text-3xl font-bold text-foreground">&lt;100ms</span>
            <span className="text-sm text-muted-foreground mt-1">Delivery</span>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="h-6 w-6 text-muted-foreground mb-3" />
            <span className="text-3xl font-bold text-foreground">JWT & API</span>
            <span className="text-sm text-muted-foreground mt-1">Secure Auth</span>
          </div>
          <div className="flex flex-col items-center">
            <Cloud className="h-6 w-6 text-muted-foreground mb-3" />
            <span className="text-3xl font-bold text-foreground">100%</span>
            <span className="text-sm text-muted-foreground mt-1">Open Source</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-12 bg-card">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <Cloud className="h-5 w-5 text-primary" />
            DropNode
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DropNode. All rights reserved.
          </p>
        </div>
      </footer>
      
    </div>
  );
}
