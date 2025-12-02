'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:no-underline">
          Sustainability Atlas
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <Link href="/tools" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">
            Tools
          </Link>
          <Link href="/collections" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">
            Collections
          </Link>
          <Link href="/articles" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">
            Articles
          </Link>

          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
