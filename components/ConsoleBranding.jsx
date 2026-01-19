// components/ConsoleBranding.jsx
"use client";

import { useEffect } from 'react';
import { initConsoleBranding } from '@/utils/consoleBranding';

export default function ConsoleBranding() {
  useEffect(() => {
    initConsoleBranding();
  }, []);

  return null;
}