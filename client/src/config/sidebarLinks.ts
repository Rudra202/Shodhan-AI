import {
  LayoutDashboard, Users, Package, TrendingUp, Mail, BookOpen, Bot,
  BarChart3, FileText, Calendar, CheckSquare, Crosshair,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SidebarLink {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const sidebarLinks: SidebarLink[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/sales', label: 'Sales', icon: TrendingUp },
  { to: '/emails', label: 'Email AI', icon: Mail },
  { to: '/knowledge', label: 'Knowledge Base', icon: BookOpen },
  { to: '/ai-chat', label: 'AI Chat', icon: Bot },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/meetings', label: 'Meetings', icon: Calendar },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
  { to: '/competitors', label: 'Competitors', icon: Crosshair },
];
