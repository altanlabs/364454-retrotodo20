import { ReactNode } from 'react';
import { useTheme } from '@/theme/use-theme';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#f0f0f0] dark:bg-[#2a2a2a] p-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8 px-4 py-2 bg-white dark:bg-gray-800 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-2xl font-mono font-bold">Retro Todo</h1>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="px-4 py-2 font-mono text-sm border-2 border-black bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </header>

        <main>
          {children}
        </main>

        <footer className="mt-8 text-center font-mono text-sm text-gray-600 dark:text-gray-400">
          Made with 💾 in 2024
        </footer>
      </div>
    </div>
  );
}