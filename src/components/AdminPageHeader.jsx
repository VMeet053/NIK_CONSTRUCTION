import React from 'react';

export default function AdminPageHeader({ title, children, icon, stats }) {
  return (
    <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden">
      {/* Decorative Accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-400 to-amber-600 rounded-l-2xl"></div>
      
      {/* Abstract Background Decoration */}
      <div className="absolute right-0 top-0 h-full w-64 opacity-5 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-black fill-current">
          <path d="M45,-76.2C58.9,-69.6,71.2,-59.1,81.6,-46.7C92,-34.3,100.4,-20,98.8,-6.4C97.2,7.2,85.6,20.1,74.5,31.2C63.4,42.3,52.8,51.6,41.2,59.3C29.6,67,17,73.1,3.4,74.7C-10.2,76.3,-24.8,73.4,-38.4,67.1C-52,60.8,-64.6,51.1,-73.4,38.8C-82.2,26.5,-87.2,11.6,-85.4,-2.4C-83.6,-16.4,-75,-29.5,-64.3,-40.3C-53.6,-51.1,-40.8,-59.6,-27.9,-66.8C-15,-74,-2,-79.9,11.5,-78.9C25,-77.9,31.1,-82.8,45,-76.2Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="flex items-center gap-4 pl-3 relative z-10 w-full md:w-auto">
        {icon && (
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shadow-inner ring-1 ring-amber-100">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
          {stats && (
            <p className="text-sm text-gray-500 font-medium mt-0.5">{stats}</p>
          )}
        </div>
      </div>
      
      <div className="relative z-10 flex gap-3 w-full md:w-auto justify-end">
        {children}
      </div>
    </div>
  );
}
