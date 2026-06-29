import { useState } from 'react';
import { Bell, Shield, Mail, Moon, Sun, Users, Palette, Webhook, Save, Eye, EyeOff, GripVertical } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { useTheme } from '../../contexts/ThemeContext';
import { sidebarLinks } from '../../config/sidebarLinks';
import { useSidebar } from '../../contexts/SidebarContext';

interface SettingSection {
  id: string;
  label: string;
  icon: typeof Bell;
}

const sections: SettingSection[] = [
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'sidebar', label: 'Sidebar', icon: Eye },
  { id: 'privacy', label: 'Privacy & Security', icon: Shield },
  { id: 'email', label: 'Email Preferences', icon: Mail },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'integrations', label: 'Integrations', icon: Webhook },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('notifications');
  const { theme, toggle } = useTheme();
  const { visibleLinks, toggleLink } = useSidebar();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    marketingEmails: false,
    twoFactorAuth: false,
    autoSave: true,
    publicProfile: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'sidebar':
        return (
          <div className="space-y-4">
            <p className="text-sm text-surface-500 mb-4">Toggle which navigation items appear in the sidebar</p>
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const visible = visibleLinks[link.to];
              return (
                <div key={link.to} className="card flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-surface-600 cursor-grab" />
                    <div className="w-9 h-9 rounded-lg bg-primary-500/10 flex items-center justify-center">
                      <Icon className="w-4 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{link.label}</p>
                      <p className="text-xs text-surface-500">{link.to}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleLink(link.to)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${visible ? 'bg-primary-500' : 'bg-surface-700'}`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform flex items-center justify-center ${visible ? 'translate-x-6' : 'translate-x-0.5'}`}>
                      {visible ? <Eye className="w-3 h-3 text-primary-500" /> : <EyeOff className="w-3 h-3 text-surface-500" />}
                    </div>
                  </button>
                </div>
              );
            })}

          </div>
        );
      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-base font-semibold text-white mb-4">Theme</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                    {theme === 'dark' ? <Moon className="w-5 h-5 text-primary-400" /> : <Sun className="w-5 h-5 text-primary-400" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                    <p className="text-xs text-surface-500">Switch between dark and light theme</p>
                  </div>
                </div>
                <button onClick={toggle} className={`relative w-12 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-primary-500' : 'bg-surface-700'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
            <div className="card">
              <h3 className="text-base font-semibold text-white mb-4">Layout</h3>
              <div className="space-y-4">
                {['Compact Mode', 'Reduced Motion'].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <span className="text-sm text-surface-300">{item}</span>
                    <button className="relative w-12 h-6 rounded-full bg-surface-700">
                      <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-surface-400 shadow" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-4">
            <p className="text-sm text-surface-500 mb-4">Configure how you receive notifications</p>
            {[
              { key: 'emailNotifications' as const, label: 'Email Notifications', desc: 'Receive notifications via email' },
              { key: 'pushNotifications' as const, label: 'Push Notifications', desc: 'Receive push notifications in browser' },
              { key: 'weeklyDigest' as const, label: 'Weekly Digest', desc: 'Get a weekly summary of activities' },
              { key: 'marketingEmails' as const, label: 'Marketing Emails', desc: 'Receive product updates and offers' },
            ].map((item) => (
              <div key={item.key} className="card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-xs text-surface-500">{item.desc}</p>
                  </div>
                </div>
                <button onClick={() => toggleSetting(item.key)} className={`relative w-12 h-6 rounded-full transition-colors ${settings[item.key] ? 'bg-primary-500' : 'bg-surface-700'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${settings[item.key] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-4">
            {[
              { key: 'twoFactorAuth' as const, label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account' },
              { key: 'autoSave' as const, label: 'Auto-Save Sessions', desc: 'Automatically save your sessions' },
              { key: 'publicProfile' as const, label: 'Public Profile', desc: 'Make your profile visible to others' },
            ].map((item) => (
              <div key={item.key} className="card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-xs text-surface-500">{item.desc}</p>
                  </div>
                </div>
                <button onClick={() => toggleSetting(item.key)} className={`relative w-12 h-6 rounded-full transition-colors ${settings[item.key] ? 'bg-primary-500' : 'bg-surface-700'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${settings[item.key] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
            <div className="card">
              <h3 className="text-sm font-medium text-white mb-3">Change Password</h3>
              <div className="space-y-3">
                {['Current Password', 'New Password', 'Confirm Password'].map((field) => (
                  <div key={field}>
                    <label className="text-xs text-surface-500 mb-1 block">{field}</label>
                    <input type="password" className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-white placeholder-surface-500 focus:outline-none focus:border-primary-500" placeholder="••••••••" />
                  </div>
                ))}
                <button className="btn-primary text-sm mt-2">Update Password</button>
              </div>
            </div>
          </div>
        );
      case 'email':
        return (
          <div className="space-y-4">
            <div className="card">
              <h3 className="text-sm font-medium text-white mb-3">Email Signatures</h3>
              <textarea className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-white placeholder-surface-500 focus:outline-none focus:border-primary-500 h-24" defaultValue="Best regards,\nJohn Doe\nShodhan AI" />
            </div>
            <div className="card">
              <h3 className="text-sm font-medium text-white mb-3">Auto-Reply</h3>
              <div className="space-y-3">
                <input type="text" className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-white placeholder-surface-500 focus:outline-none focus:border-primary-500" placeholder="Subject" />
                <textarea className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-white placeholder-surface-500 focus:outline-none focus:border-primary-500 h-24" placeholder="Auto-reply message..." />
                <button className="btn-primary text-sm">Save Auto-Reply</button>
              </div>
            </div>
          </div>
        );
      case 'team':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Team Members</h3>
              <button className="btn-primary text-sm flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Invite</button>
            </div>
            {[
              { name: 'Rahul Sharma', email: 'rahul@shodhanai.com', role: 'Admin' },
              { name: 'Priya Mehta', email: 'priya@shodhanai.com', role: 'Editor' },
              { name: 'Amit Kumar', email: 'amit@shodhanai.com', role: 'Viewer' },
              { name: 'Neha Patel', email: 'neha@shodhanai.com', role: 'Editor' },
            ].map((member) => (
              <div key={member.email} className="card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-500/10 flex items-center justify-center text-sm font-medium text-primary-400">{member.name.charAt(0)}</div>
                  <div>
                    <p className="text-sm font-medium text-white">{member.name}</p>
                    <p className="text-xs text-surface-500">{member.email}</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-surface-800 text-surface-300">{member.role}</span>
              </div>
            ))}
          </div>
        );
      case 'integrations':
        return (
          <div className="space-y-4">
            {[
              { name: 'Slack', icon: '💬', status: 'Connected', desc: 'Receive notifications in Slack' },
              { name: 'GitHub', icon: '🔧', status: 'Connected', desc: 'Sync issues and pull requests' },
              { name: 'Google Drive', icon: '📁', status: 'Connected', desc: 'Access documents from Drive' },
              { name: 'Stripe', icon: '💳', status: 'Disconnected', desc: 'Payment processing integration' },
              { name: 'HubSpot', icon: '📊', status: 'Disconnected', desc: 'CRM and marketing integration' },
            ].map((integration) => (
              <div key={integration.name} className="card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-800 flex items-center justify-center text-lg">{integration.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-white">{integration.name}</p>
                    <p className="text-xs text-surface-500">{integration.desc}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${integration.status === 'Connected' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-surface-800 text-surface-400'}`}>{integration.status}</span>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">
      <PageHeader title="Settings" subtitle="Manage your account, team, and application preferences" actions={<button className="btn-primary text-sm flex items-center gap-2"><Save className="w-4 h-4" /> Save Changes</button>} />
      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="lg:w-56 shrink-0">
          <nav className="card p-2 space-y-1 sticky top-24">
            {sections.map((sec) => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${activeSection === sec.id ? 'bg-primary-500/10 text-primary-400 font-medium' : 'text-surface-400 hover:text-white hover:bg-surface-800'}`}
                >
                  <Icon className="w-4 h-4" /> {sec.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="flex-1 min-w-0">{renderContent()}</div>
      </div>
    </div>
  );
}
