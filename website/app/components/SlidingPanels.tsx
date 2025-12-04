'use client';

import { useEffect, useRef } from 'react';
import { usePanels } from './PanelContext';

export function SlidingPanels({ children }: { children: React.ReactNode }) {
  const { panels } = usePanels();
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the rightmost panel when a new panel is added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [panels.length]);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Main content area */}
      <div
        className={`flex-shrink-0 overflow-y-auto ${
          panels.length > 0 ? 'w-[400px]' : 'flex-1'
        } transition-all duration-300`}
      >
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          {children}
        </div>
      </div>

      {/* Sliding panels */}
      {panels.length > 0 && (
        <div
          ref={containerRef}
          className="flex-1 overflow-x-auto overflow-y-hidden flex border-l border-[var(--border)]"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {panels.map((panel) => (
            <div
              key={panel.id}
              className="flex-shrink-0 w-[500px] overflow-y-auto border-r border-[var(--border)] bg-[var(--bg-secondary)]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="px-6 py-8">
                {panel.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
