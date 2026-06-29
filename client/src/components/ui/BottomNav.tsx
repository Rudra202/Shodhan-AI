import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Bot, BarChart3, CheckSquare } from 'lucide-react';
import { sidebarLinks } from '../../config/sidebarLinks';
import { useSidebar } from '../../contexts/SidebarContext';

const mobileTabs = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { to: '/customers', icon: Users, label: 'Customers' },
  { to: '/ai-chat', icon: Bot, label: 'AI Chat' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-900/95 backdrop-blur-xl border-t border-surface-800 safe-area-bottom" aria-label="Mobile navigation">
      <div className="flex items-center justify-around h-14 px-2">
        {mobileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.to || pathname.startsWith(tab.to + '/');
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-0 ${
                isActive ? 'text-primary-400' : 'text-surface-500 hover:text-surface-300'
              }`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
