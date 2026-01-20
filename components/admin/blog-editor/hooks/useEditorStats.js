// components/admin/blog-editor/hooks/useEditorStats.js
import { useEffect, useState } from 'react';

export function useEditorStats(editor) {
  const [stats, setStats] = useState({
    characters: 0,
    words: 0,
    readingTime: '0 min',
  });

  useEffect(() => {
    if (!editor) return;

    const updateStats = () => {
      const text = editor.state.doc.textContent || '';
      
      // Character count (excluding spaces for more accurate count)
      const characters = text.length;
      
      // Word count
      const words = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
      
      // Reading time (average 200 words per minute)
      const minutes = Math.ceil(words / 200);
      const readingTime = minutes <= 1 ? '1 min read' : `${minutes} min read`;

      setStats({ characters, words, readingTime });
    };

    // Initial calculation
    updateStats();

    // Listen to editor updates
    editor.on('update', updateStats);

    return () => {
      editor.off('update', updateStats);
    };
  }, [editor]);

  return stats;
}