'use client';

import { useState, useEffect, useRef } from 'react';

interface PreviewData {
  title: string;
  overview?: string;
  thumbnail?: string;
  category: string;
}

interface LinkPreviewProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  previewData?: PreviewData;
}

export function LinkPreview({ href, children, className, previewData }: LinkPreviewProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const linkRef = useRef<HTMLAnchorElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleMouseEnter = () => {
    if (!previewData) return;

    timeoutRef.current = setTimeout(() => {
      if (linkRef.current) {
        const rect = linkRef.current.getBoundingClientRect();
        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.bottom + 8,
        });
        setShowPreview(true);
      }
    }, 300); // Delay before showing preview
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowPreview(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <a
        ref={linkRef}
        href={href}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>

      {showPreview && previewData && (
        <div
          className="fixed z-[100] pointer-events-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg shadow-2xl overflow-hidden animate-fade-in w-80">
            {previewData.thumbnail && (
              <div className="w-full h-40 bg-[var(--border-subtle)] overflow-hidden">
                <img
                  src={previewData.thumbnail}
                  alt={previewData.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
                  {previewData.category}
                </span>
              </div>
              <h3 className="text-sm font-semibold mb-2 text-[var(--text-primary)]">
                {previewData.title}
              </h3>
              {previewData.overview && (
                <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                  {previewData.overview}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
