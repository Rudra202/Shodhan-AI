import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, LayoutDashboard } from 'lucide-react';

const labelMap: Record<string, string> = {
  dashboard: 'Dashboard',
  customers: 'Customers',
  products: 'Products',
  sales: 'Sales',
  emails: 'Email AI',
  knowledge: 'Knowledge Base',
  'ai-chat': 'AI Chat',
  analytics: 'Analytics',
  documents: 'Documents',
  meetings: 'Meetings',
  tasks: 'Tasks',
  competitors: 'Competitors',
  profile: 'Profile',
  settings: 'Settings',
};

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-surface-500 mb-4">
      <Link to="/dashboard" className="hover:text-surface-300 transition-colors">
        <LayoutDashboard className="w-3.5 h-3.5" />
      </Link>
      {segments.map((seg, i) => {
        const label = labelMap[seg] || seg.charAt(0).toUpperCase() + seg.slice(1);
        const isLast = i === segments.length - 1;
        return (
          <span key={seg} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3" />
            {isLast ? (
              <span className="text-surface-300 font-medium">{label}</span>
            ) : (
              <Link to={`/${seg}`} className="hover:text-surface-300 transition-colors">{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
