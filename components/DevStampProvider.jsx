'use client';

import React from 'react';
import DeveloperStamp from './DeveloperStamp';
import useDevConsole from '@/hooks/useDevConsole';

const DevStampProvider = ({ children }) => {
  const { isOpen, closeModal } = useDevConsole();

  return (
    <>
      {children}
      <DeveloperStamp isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default DevStampProvider;