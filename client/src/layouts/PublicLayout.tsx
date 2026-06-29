import { Link, Outlet } from 'react-router-dom';
import { Brain, Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-950/80 backdrop-blur-xl border-b border-surface-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Shodhan</span>
              <span className="text-xl font-bold text-primary-400">AI</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <button onClick={toggle} className="btn-ghost text-sm p-2" title="Toggle theme">
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link to="/login" className="btn-ghost text-sm">Sign In</Link>
              <Link to="/register" className="btn-primary text-sm">Get Started</Link>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button onClick={toggle} className="btn-ghost text-sm p-2" title="Toggle theme">
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button className="btn-ghost" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-surface-800 bg-surface-900">
            <div className="px-4 py-4 space-y-3">
              <Link to="/login" className="block w-full text-center btn-secondary text-sm" onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
              <Link to="/register" className="block w-full text-center btn-primary text-sm" onClick={() => setMenuOpen(false)}>
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <footer className="border-t border-surface-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary-500" />
              <span className="text-sm text-surface-400">Shodhan AI &copy; {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-surface-500">
              <a href="#" className="hover:text-surface-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-surface-300 transition-colors">Terms</a>
              <a href="#" className="hover:text-surface-300 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
