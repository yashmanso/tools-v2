import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import { PanelProvider } from './components/PanelContext';
import { SlidingPanels } from './components/SlidingPanels';
import { Header } from './components/Header';

export const metadata: Metadata = {
  title: 'Sustainability Atlas',
  description: 'Tools and methods for sustainable entrepreneurship and innovation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <PanelProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <SlidingPanels>
                {children}
              </SlidingPanels>
              <footer className="border-t border-[var(--border)] py-8">
                <div className="container mx-auto px-6 max-w-5xl">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="text-sm text-[var(--text-muted)]">
                      Sustainability Atlas
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      Tools and methods for sustainable entrepreneurship
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </PanelProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
