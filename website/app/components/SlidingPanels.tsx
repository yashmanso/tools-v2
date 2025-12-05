'use client';

import { useEffect, useRef, useState } from 'react';
import { usePanels, Panel } from './PanelContext';

export function SlidingPanels({ children }: { children: React.ReactNode }) {
  const { panels, removePanel } = usePanels();
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedPanel, setExpandedPanel] = useState<Panel | null>(null);

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
              className="flex-shrink-0 w-[500px] overflow-y-auto border-r border-[var(--border)] bg-[var(--bg-secondary)] relative"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Control buttons */}
              <div className="sticky top-4 right-4 float-right z-10 flex gap-2">
                {/* Expand button */}
                <button
                  onClick={() => setExpandedPanel(panel)}
                  className="p-2 rounded-full bg-[var(--bg-primary)] hover:bg-[var(--border)] border border-[var(--border)] transition-colors"
                  aria-label="Expand panel"
                >
                  <svg
                    className="w-5 h-5 text-[var(--text-primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </button>

                {/* Close button */}
                <button
                  onClick={() => removePanel(panel.id)}
                  className="p-2 rounded-full bg-[var(--bg-primary)] hover:bg-[var(--border)] border border-[var(--border)] transition-colors"
                  aria-label="Close panel"
                >
                  <svg
                    className="w-5 h-5 text-[var(--text-primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-6 py-8 clear-both">
                {panel.content}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Expanded panel modal */}
      {expandedPanel && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm p-4"
          onClick={() => setExpandedPanel(null)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] bg-[var(--bg-primary)] rounded-lg shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {expandedPanel.title}
              </h2>
              <button
                onClick={() => setExpandedPanel(null)}
                className="p-2 rounded-full hover:bg-[var(--border)] transition-colors"
                aria-label="Close expanded view"
              >
                <svg
                  className="w-6 h-6 text-[var(--text-primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto">
                {expandedPanel.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
