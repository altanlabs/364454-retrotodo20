import { ReactNode } from 'react';
import { useTheme } from './theme/use-theme';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#f0f0f0] dark:bg-[#2a2a2a] p-4">
      <div className="max-w-md mx-auto">
        <header className="mb-8 text-center">
          <div className="inline-block bg-white dark:bg-gray-800 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="text-2xl font-['Press_Start_2P']">RETRO TODO</h1>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="mt-4 px-4 py-2 font-['Press_Start_2P'] text-sm border-2 border-black bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </header>

        <main>
          {children}
        </main>

        <footer className="mt-8 text-center font-['Press_Start_2P'] text-xs text-gray-600 dark:text-gray-400">
          PRESS START TO BEGIN
        </footer>
      </div>
    </div>
  );
}