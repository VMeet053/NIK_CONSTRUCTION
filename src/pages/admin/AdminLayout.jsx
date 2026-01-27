import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#fcfbf9] font-sans selection:bg-amber-100 selection:text-amber-900 relative">
      <Sidebar />
      
      {/* Background Theme Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#FDFBF7]">
        {/* 1. Base Paper Texture - Gives the vintage feel */}
        <div className="absolute inset-0 opacity-[0.4] mix-blend-multiply" 
             style={{ 
               backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")`,
               backgroundRepeat: 'repeat'
             }}>
        </div>

        {/* 2. Main Full Background Image with Effect */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/admin-bg.png" 
            alt="Heritage Background" 
            className="w-full h-full object-cover opacity-[0.15] grayscale contrast-125 sepia-[0.2]"
            style={{ mixBlendMode: 'multiply' }}
            onError={(e) => {
              // Fallback to a nice heritage construction sketch style image
              e.target.src = "https://images.unsplash.com/photo-1541662919830-4384a3641b9d?q=80&w=2000&auto=format&fit=crop";
            }}
          />
          
          {/* Gradient Overlay - Fades image at top for cleaner header area */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent"></div>
        </div>

        {/* 3. Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-amber-800/20 to-transparent"></div>
      </div>

      <main className="flex-1 ml-64 p-8 overflow-x-hidden relative z-10">
        <div className="w-full relative z-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
