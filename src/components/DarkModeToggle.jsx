'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // On mount, set initial theme from system preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
    setIsDark(prefersDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    document.documentElement.classList.toggle('dark', newTheme);
    setIsDark(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-center rounded-full font-custom text-2xl inline-block tracking-normal px-2 py-2 bg-brand-text-dark transition-colors duration-500 ease-in-out dark:bg-brand-text dark:text-white"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
