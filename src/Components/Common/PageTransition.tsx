import React from 'react';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="animate-in fade-in duration-300 w-full">
      {children}
    </div>
  );
};
