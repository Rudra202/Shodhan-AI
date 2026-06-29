import { Link } from 'react-router-dom';
import { Brain, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-surface-800 flex items-center justify-center mx-auto mb-8">
          <Brain className="w-10 h-10 text-surface-500" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-surface-400 mb-8">
          This page doesn't exist in our knowledge base.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <Home className="w-4 h-4" /> Go Home
        </Link>
      </div>
    </div>
  );
}
