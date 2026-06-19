'use client';

import { useState, useEffect } from 'react';

const useDevConsole = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Define the console command
    const devCommand = () => {
      setIsOpen(true);
      console.log(
        '%c🚀 Your Zeroes And Ones',
        'color: #1a1a1a; font-size: 20px; font-weight: bold;'
      );
      console.log(
        '%cDeveloper credits opened!',
        'color: #666; font-size: 12px;'
      );
      return 'Opening developer credits...';
    };

    // Attach to window object
    // Using bracket notation to allow hyphen in function name
    window['yzo-dev'] = devCommand;

    // Also add without hyphen for easier typing
    window.yzodev = devCommand;
    window.yzoDev = devCommand;

    // Console welcome message (optional)
    console.log(
      '%c👋 Hey there, curious developer!',
      'color: #333; font-size: 14px; font-weight: bold;'
    );
    console.log(
      '%cType %cyzo-dev()%c or %cyzoDev()%c to see who made this website!',
      'color: #666; font-size: 12px;',
      'color: #0066cc; font-size: 12px; font-weight: bold;',
      'color: #666; font-size: 12px;',
      'color: #0066cc; font-size: 12px; font-weight: bold;',
      'color: #666; font-size: 12px;'
    );

    // Cleanup
    return () => {
      delete window['yzo-dev'];
      delete window.yzodev;
      delete window.yzoDev;
    };
  }, []);

  const closeModal = () => setIsOpen(false);

  return { isOpen, closeModal };
};

export default useDevConsole;