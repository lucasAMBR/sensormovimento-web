// app/components/ThemeToggle.tsx
"use client";

import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-0 right-0 rounded-lg bg-gray-800 dark:bg-gray-200 text-gray-200 dark:text-gray-800 p-4 m-3"
      aria-label="Alternar modo"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};