import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Brain, LogOut, ChevronDown, Settings, Bell, Sun, Moon, PanelLeftClose, PanelLeft, User, Menu, X, Search } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { authApi } from '../api/auth';
import { useTheme } from '../contexts/ThemeContext';
import { sidebarLinks } from '../config/sidebarLinks';
import { useSidebar } from '../contexts/SidebarContext';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import GlobalSearch from '../components/ui/GlobalSearch';
import BottomNav from '../components/ui/BottomNav';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'New lead captured', message: 'Acme Corp has been added as a new lead.', time: '2m ago', read: false, type: 'info' },
  { id: '2', title: 'AI insight ready', message: 'Your weekly sales forecast is now available.', time: '15m ago', read: false, type: 'success' },
  { id: '3', title: 'Email campaign sent', message: 'Q2 newsletter delivered to 1,234 contacts.', time: '1h ago', read: false, type: 'info' },
  { id: '4', title: 'Meeting reminder', message: 'Team stand-up starts in 10 minutes.', time: '2h ago', read: true, type: 'warning' },
  { id: '5', title: 'Integration error', message: 'GitHub sync failed. Check your connection.', time: '5h ago', read: true, type: 'error' },
];

export default function AuthLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [mobileNotifOpen, setMobileNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuthStore();
  const { theme, toggle } = useTheme();
  const { visibleLinks } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
    setMobileNotifOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setProfileOpen(false);
        setNotifOpen(false);
        setMobileNotifOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    }
    logout();
    navigate('/login');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?';

  const sidebarContent = (
    <>
      <div className={`flex items-center h-16 shrink-0 border-b border-surface-800 ${sidebarCollapsed ? 'justify-center px-0' : 'px-5 gap-2.5'}`}>
        <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shrink-0">
          <Brain className="w-4 h-4 text-white" />
        </div>
        {!sidebarCollapsed && (
          <>
            <span className="text-lg font-bold text-white">Shodhan</span>
            <span className="text-lg font-bold text-primary-400">AI</span>
          </>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-2.5 space-y-0.5 scrollbar-thin">
        {sidebarLinks.filter((l) => visibleLinks[l.to] !== false).map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 rounded-xl transition-all duration-200
                ${sidebarCollapsed ? 'justify-center px-0 py-2.5' : 'px-3.5 py-2.5'}
                ${isActive ? 'bg-primary-500/10 text-primary-400 font-medium' : 'text-surface-400 hover:text-white hover:bg-surface-800'}`}
              title={sidebarCollapsed ? link.label : undefined}
            >
              <link.icon className="w-5 h-5 shrink-0" />
              {!sidebarCollapsed && <span className="text-sm font-medium">{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 p-2.5 border-t border-surface-800 flex flex-col gap-0.5">
        <Link
          to="/settings"
          className={`flex items-center gap-3 text-surface-400 hover:text-white hover:bg-surface-800 rounded-xl transition-all duration-200
            ${sidebarCollapsed ? 'justify-center px-0 py-2.5' : 'px-3.5 py-2.5'}`}
          title={sidebarCollapsed ? 'Settings' : undefined}
        >
          <Settings className="w-5 h-5 shrink-0" />
          {!sidebarCollapsed && <span className="text-sm font-medium">Settings</span>}
        </Link>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={`flex items-center gap-3 text-surface-400 hover:text-white hover:bg-surface-800 rounded-xl transition-all duration-200
            ${sidebarCollapsed ? 'justify-center px-0 py-2.5' : 'px-3.5 py-2.5'}`}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <PanelLeft className="w-5 h-5 shrink-0" /> : <PanelLeftClose className="w-5 h-5 shrink-0" />}
          {!sidebarCollapsed && <span className="text-sm font-medium">Collapse</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-surface-950 flex">
      {/* Desktop sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-surface-900/95 backdrop-blur-xl border-r border-surface-800 flex-col hidden lg:flex transition-all duration-300
          ${sidebarCollapsed ? 'w-16' : 'w-64'}`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <aside
            className="absolute inset-y-0 left-0 w-72 bg-surface-900 border-r border-surface-800 flex flex-col animate-slide-in-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between h-16 px-5 border-b border-surface-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shrink-0">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">Shodhan</span>
                <span className="text-lg font-bold text-primary-400">AI</span>
              </div>
              <button className="btn-ghost p-1" onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-2.5 space-y-0.5 scrollbar-thin">
              {sidebarLinks.filter((l) => visibleLinks[l.to] !== false).map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200
                      ${isActive ? 'bg-primary-500/10 text-primary-400 font-medium' : 'text-surface-400 hover:text-white hover:bg-surface-800'}`}
                  >
                    <link.icon className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="shrink-0 p-2.5 border-t border-surface-800">
              <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-surface-400 hover:text-white hover:bg-surface-800 transition-all duration-200">
                <Settings className="w-5 h-5" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <header className="h-16 bg-surface-900/80 backdrop-blur-xl border-b border-surface-800 flex items-center justify-between px-3 sm:px-5 lg:px-7 sticky top-0 z-30">
          <button className="lg:hidden btn-ghost p-2 -ml-2" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-3 ml-auto">
            <button onClick={() => setSearchOpen(true)} className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-800/50 border border-surface-700 text-surface-500 hover:text-surface-300 hover:border-surface-600 transition-colors text-xs" aria-label="Search">
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
              <kbd className="flex items-center gap-0.5 text-[10px] text-surface-600 bg-surface-900 px-1 py-0.5 rounded border border-surface-700 ml-4">
                <span>⌘</span>K
              </kbd>
            </button>
            <button className="sm:hidden btn-ghost p-2" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={toggle} className="btn-ghost p-2" title="Toggle theme" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile notification button */}
            <button className="lg:hidden btn-ghost relative p-2" onClick={() => setMobileNotifOpen(!mobileNotifOpen)} aria-label="Notifications">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Desktop notifications */}
            <div className="relative hidden lg:block" ref={notifRef}>
              <button className="btn-ghost relative p-2" onClick={() => setNotifOpen(!notifOpen)} aria-label="Notifications">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface-800 border border-surface-700 rounded-xl shadow-2xl z-50 animate-scale-in origin-top-right">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-surface-700">
                    <h3 className="text-sm font-semibold text-surface-100">Notifications</h3>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs text-primary-400 hover:text-primary-300 transition-colors font-medium">
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-center text-surface-500 text-sm py-8">No notifications</p>
                    ) : (
                      notifications.map((n) => (
                        <div key={n.id} className={`px-4 py-3 border-b border-surface-700/50 last:border-b-0 hover:bg-surface-700/50 transition-colors ${!n.read ? 'bg-surface-700/20' : ''}`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                              n.type === 'success' ? 'bg-emerald-500' :
                              n.type === 'warning' ? 'bg-amber-500' :
                              n.type === 'error' ? 'bg-red-500' : 'bg-primary-500'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm ${!n.read ? 'text-surface-100 font-medium' : 'text-surface-300'}`}>{n.title}</p>
                              <p className="text-xs text-surface-500 mt-0.5 truncate">{n.message}</p>
                              <p className="text-[11px] text-surface-600 mt-1">{n.time}</p>
                            </div>
                            {!n.read && (
                              <div className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0 mt-1.5" />
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-800 transition-colors"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="Profile menu"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-600 flex items-center justify-center text-sm font-medium text-white">
                  {userInitial}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-surface-100 leading-tight">{user?.name || 'User'}</p>
                  <p className="text-xs text-surface-500">{user?.email}</p>
                </div>
                <ChevronDown className="hidden sm:block w-4 h-4 text-surface-400" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface-800 border border-surface-700 rounded-xl shadow-2xl py-2 z-50 animate-scale-in origin-top-right">
                  <div className="px-4 py-2 border-b border-surface-700">
                    <p className="text-sm font-medium text-surface-100">{user?.name || 'User'}</p>
                    <p className="text-xs text-surface-500 truncate">{user?.email}</p>
                  </div>
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-300 hover:bg-surface-700 transition-colors" onClick={() => setProfileOpen(false)}>
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-300 hover:bg-surface-700 transition-colors" onClick={() => setProfileOpen(false)}>
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <div className="border-t border-surface-700 mt-2 pt-2">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-surface-700 w-full transition-colors">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile notification sheet */}
        {mobileNotifOpen && (
          <div className="lg:hidden fixed inset-0 z-30" onClick={() => setMobileNotifOpen(false)}>
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-0 left-0 right-0 bg-surface-900 border-t border-surface-800 rounded-t-2xl max-h-[60vh] overflow-y-auto animate-slide-up" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-surface-800 sticky top-0 bg-surface-900">
                <h3 className="text-sm font-semibold text-white">Notifications</h3>
                <div className="flex items-center gap-3">
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-primary-400 font-medium">Mark all read</button>
                  )}
                  <button onClick={() => setMobileNotifOpen(false)} className="btn-ghost p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="px-4 py-2">
                {notifications.length === 0 ? (
                  <p className="text-center text-surface-500 text-sm py-8">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className={`py-3 border-b border-surface-800 last:border-b-0 ${!n.read ? '' : ''}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          n.type === 'success' ? 'bg-emerald-500' :
                          n.type === 'warning' ? 'bg-amber-500' :
                          n.type === 'error' ? 'bg-red-500' : 'bg-primary-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${!n.read ? 'text-surface-100 font-medium' : 'text-surface-300'}`}>{n.title}</p>
                          <p className="text-xs text-surface-500 mt-0.5">{n.message}</p>
                          <p className="text-[11px] text-surface-600 mt-1">{n.time}</p>
                        </div>
                        {!n.read && (
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0 mt-1.5" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto pb-20 lg:pb-8">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>

      <BottomNav />
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
