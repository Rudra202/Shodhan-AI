import { useState, useRef, useEffect } from 'react';
import { Search, Command, FileText, Users, Mail, CheckSquare, Package, TrendingUp, BookOpen, Calendar, Crosshair, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const searchIndex = [
  { label: 'Customers', icon: Users, to: '/customers', keywords: ['clients', 'leads', 'accounts'] },
  { label: 'Products', icon: Package, to: '/products', keywords: ['items', 'inventory', 'catalog'] },
  { label: 'Sales', icon: TrendingUp, to: '/sales', keywords: ['revenue', 'deals', 'pipeline'] },
  { label: 'Email AI', icon: Mail, to: '/emails', keywords: ['inbox', 'messages', 'mail'] },
  { label: 'Knowledge Base', icon: BookOpen, to: '/knowledge', keywords: ['docs', 'wiki', 'articles'] },
  { label: 'Analytics', icon: TrendingUp, to: '/analytics', keywords: ['reports', 'metrics', 'stats'] },
  { label: 'Documents', icon: FileText, to: '/documents', keywords: ['files', 'uploads', 'pdf'] },
  { label: 'Meetings', icon: Calendar, to: '/meetings', keywords: ['calendar', 'schedule', 'calls'] },
  { label: 'Tasks', icon: CheckSquare, to: '/tasks', keywords: ['todo', 'kanban', 'assignments'] },
  { label: 'Competitors', icon: Crosshair, to: '/competitors', keywords: ['market', 'rivals', 'analysis'] },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = query.trim()
    ? searchIndex.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords.some((k) => k.includes(query.toLowerCase()))
      )
    : searchIndex;

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && results[selectedIndex]) {
      navigate(results[selectedIndex].to);
      onClose();
    }
    if (e.key === 'Escape') onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg mx-4 bg-surface-900 border border-surface-800 rounded-2xl shadow-2xl overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-800">
          <Search className="w-5 h-5 text-surface-500 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, customers, documents..."
            className="flex-1 bg-transparent text-sm text-white placeholder-surface-500 focus:outline-none"
            aria-label="Search"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] text-surface-500 bg-surface-800 px-1.5 py-0.5 rounded border border-surface-700">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
          <button onClick={onClose} className="btn-ghost p-1"><X className="w-4 h-4" /></button>
        </div>
        <div className="max-h-72 overflow-y-auto p-2 space-y-0.5">
          {results.length === 0 ? (
            <p className="text-sm text-surface-500 text-center py-8">No results found</p>
          ) : (
            results.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.to}
                  onClick={() => { navigate(item.to); onClose(); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                    i === selectedIndex ? 'bg-surface-800 text-white' : 'text-surface-400 hover:text-white hover:bg-surface-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <span className="text-[10px] text-surface-600">{item.to}</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
