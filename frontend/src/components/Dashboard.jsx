import React from 'react';
import { NavLink, Outlet, Routes, Route } from 'react-router-dom';
import { LayoutGrid, UploadCloud, KeySquare, LogOut, Cloud } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Dashboard({ user, onLogout }) {
  const navItems = [
    { id: 'gallery', path: '/dashboard/gallery', label: 'Gallery', icon: LayoutGrid },
    { id: 'upload', path: '/dashboard/upload', label: 'Upload Zone', icon: UploadCloud },
    { id: 'api-keys', path: '/dashboard/api-keys', label: 'Developer API Keys', icon: KeySquare },
  ];



  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
            <Cloud className="h-6 w-6" fill="currentColor" />
            <span>DropNode</span>
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent"
                )}
              >
                {({ isActive }) => (
                  <>
                    <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "")} />
                    {item.label}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border bg-secondary/30">
          <div className="mb-4 px-2">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Signed in as</p>
            <p className="text-sm font-medium text-foreground truncate" title={user?.email}>
              {user?.email || 'User'}
            </p>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-w-0 bg-background">
        <header className="h-16 flex items-center px-8 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <Routes>
            <Route path="gallery" element={<h1 className="text-lg font-medium text-foreground">Gallery</h1>} />
            <Route path="upload" element={<h1 className="text-lg font-medium text-foreground">Upload Zone</h1>} />
            <Route path="api-keys" element={<h1 className="text-lg font-medium text-foreground">Developer API Keys</h1>} />
          </Routes>
        </header>
        
        <div className="flex-grow p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </div>
      </main>

    </div>
  );
}
