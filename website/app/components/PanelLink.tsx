'use client';

import { ReactNode, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { usePanels } from './PanelContext';

interface PanelLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  openInPanel?: boolean;
}

export function PanelLink({ href, children, className, openInPanel = true }: PanelLinkProps) {
  const { addPanel } = usePanels();
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!openInPanel) {
      return; // Let default navigation happen
    }

    e.preventDefault();

    // For external links, open in new tab
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }

    // Add panel
    addPanel({
      id: `${href}-${Date.now()}`,
      title: href,
      path: href,
      content: <PanelContent path={href} />,
    });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}

// Component to fetch and display panel content
function PanelContent({ path }: { path: string }) {
  const router = useRouter();

  // This will be dynamically loaded
  // For now, just show that we're loading
  return (
    <div className="text-sm text-[var(--text-secondary)]">
      Loading {path}...
    </div>
  );
}
