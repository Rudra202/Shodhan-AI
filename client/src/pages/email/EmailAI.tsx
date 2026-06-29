import { useState } from 'react';
import { Mail, Send, Bot, Star, Clock, Paperclip, ChevronDown, ChevronUp, Inbox, AlertCircle, CheckCircle, Zap, Reply, Trash2, Archive, Sparkles, Menu, X } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import KPIGrid from '../../components/ui/KPIGrid';
import ChatPanel from '../../components/ui/ChatPanel';
import type { KPICardData } from '../../components/ui/KPICard';

const kpiCards: KPICardData[] = [
  { label: 'Unread', value: '23', change: '-5.2%', trend: 'down', icon: Mail, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
  { label: 'Pending', value: '15', change: '+3.1%', trend: 'up', icon: Clock, iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
  { label: 'Replied', value: '42', change: '+12%', trend: 'up', icon: CheckCircle, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
  { label: 'AI Drafted', value: '31', change: '+45%', trend: 'up', icon: Zap, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
];

interface Email {
  id: string; from: string; subject: string; preview: string; time: string;
  priority: 'High' | 'Normal' | 'Low'; aiSummary: string; customer: string;
  starred: boolean; read: boolean; category: string;
}

const emails: Email[] = [
  { id: '1', from: 'Sun Pharma', subject: 'Q3 Order Confirmation - Duloxetine', preview: 'We confirm receipt of your purchase order for Duloxetine HCl...', time: '10:32 AM', priority: 'High', aiSummary: 'Order confirmation for 500kg Duloxetine at ₹4,200/kg. Delivery in 21 days.', customer: 'Sun Pharma', starred: true, read: false, category: 'Orders' },
  { id: '2', from: 'Cipla Ltd', subject: 'Price Negotiation - Paracetamol USP', preview: 'We would like to discuss the pricing for Paracetamol USP...', time: '9:15 AM', priority: 'High', aiSummary: 'Cipla requesting 8% discount on Paracetamol. Current price ₹780/kg.', customer: 'Cipla Ltd', starred: false, read: false, category: 'Negotiation' },
  { id: '3', from: 'Aarti Drugs', subject: 'FDA Certificate Update', preview: 'Please find attached the renewed FDA certificate for Ibuprofen...', time: 'Yesterday', priority: 'Normal', aiSummary: 'FDA renewal certificate attached. Valid until Dec 2026.', customer: 'Aarti Drugs', starred: false, read: true, category: 'Documents' },
  { id: '4', from: 'Novartis AG', subject: 'New Product Inquiry - Amoxicillin', preview: 'We are exploring suppliers for Amoxicillin Trihydrate...', time: 'Yesterday', priority: 'High', aiSummary: 'New business inquiry. Novartis needs 1000kg/month starting Q4.', customer: 'Novartis AG', starred: true, read: false, category: 'Leads' },
  { id: '5', from: 'Bayer AG', subject: 'Meeting Request - Q4 Planning', preview: 'We would like to schedule a meeting to discuss Q4 planning...', time: '2d ago', priority: 'Normal', aiSummary: 'Bayer wants Q4 planning meeting. Suggest next Tuesday.', customer: 'Bayer AG', starred: false, read: true, category: 'Meetings' },
  { id: '6', from: 'GSK Plc', subject: 'Compliance Documents Required', preview: 'As part of our vendor onboarding, please provide the following...', time: '2d ago', priority: 'Normal', aiSummary: 'GSK needs updated compliance docs: ISO cert, GMP cert, ESG report.', customer: 'GSK Plc', starred: false, read: true, category: 'Compliance' },
  { id: '7', from: 'Lupin Ltd', subject: 'Delivery Schedule - Omeprazole', preview: 'Please confirm the delivery schedule for Omeprazole...', time: '3d ago', priority: 'Low', aiSummary: 'Lupin requesting delivery schedule for Omeprazole 200kg order.', customer: 'Lupin Ltd', starred: false, read: true, category: 'Logistics' },
  { id: '8', from: 'Zydus Life', subject: 'New Product Launch - Azithromycin', preview: 'We are pleased to announce our new Azithromycin product line...', time: '3d ago', priority: 'Low', aiSummary: 'Zydus launching Azithromycin. Marketing collaterals attached.', customer: 'Zydus Life', starred: false, read: true, category: 'Marketing' },
];

const priorityColors: Record<string, string> = {
  High: 'text-red-400 bg-red-500/10', Normal: 'text-amber-400 bg-amber-500/10', Low: 'text-green-400 bg-green-500/10',
};
const categories = ['All', 'Orders', 'Negotiation', 'Documents', 'Leads', 'Meetings', 'Compliance', 'Logistics', 'Marketing'];

export default function EmailAI() {
  const [selected, setSelected] = useState<string>('inbox');
  const [activeEmail, setActiveEmail] = useState<Email | null>(null);
  const [category, setCategory] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = category === 'All' ? emails : emails.filter((e) => e.category === category);

  const sidebarItems = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: emails.filter((e) => !e.read).length },
    { id: 'starred', label: 'Starred', icon: Star, count: emails.filter((e) => e.starred).length },
    { id: 'drafts', label: 'AI Drafts', icon: Zap, count: 5 },
    { id: 'sent', label: 'Sent', icon: Send, count: 0 },
    { id: 'archive', label: 'Archive', icon: Archive, count: 0 },
    { id: 'trash', label: 'Trash', icon: Trash2, count: 0 },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">
      <PageHeader title="Email AI" subtitle="AI-powered email management with smart summaries and replies" />
      <KPIGrid cards={kpiCards} />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <aside className="absolute inset-y-0 left-0 w-64 bg-surface-900 border-r border-surface-800 flex flex-col animate-slide-in-left" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-surface-800">
              <span className="text-sm font-semibold text-white">Mailboxes</span>
              <button className="btn-ghost p-1" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 p-2 space-y-1">
              {sidebarItems.map((item) => (
                <button key={item.id} onClick={() => { setSelected(item.id); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${selected === item.id ? 'bg-surface-800 text-white' : 'text-surface-400 hover:text-white hover:bg-surface-800/50'}`}>
                  <item.icon className="w-4 h-4" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.count > 0 && <span className="text-xs bg-primary-500/20 text-primary-400 px-1.5 py-0.5 rounded-full">{item.count}</span>}
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}

      {/* Mobile detail panel */}
      {activeEmail && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setActiveEmail(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-surface-900 border-t border-surface-800 rounded-t-2xl overflow-y-auto animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-surface-900 border-b border-surface-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-600/10 flex items-center justify-center text-xs font-bold text-primary-400">{activeEmail.from.slice(0, 2).toUpperCase()}</div>
                <div><p className="text-sm font-medium text-white">{activeEmail.from}</p><p className="text-xs text-surface-500">{activeEmail.customer}</p></div>
              </div>
              <button onClick={() => setActiveEmail(null)} className="btn-ghost p-1"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <h3 className="text-sm font-semibold text-white">{activeEmail.subject}</h3>
              <p className="text-xs text-surface-400">{activeEmail.time}</p>
              <div className="p-3 bg-primary-500/5 border border-primary-500/10 rounded-xl">
                <div className="flex items-center gap-1.5 mb-1.5"><Sparkles className="w-3.5 h-3.5 text-primary-400" /><span className="text-xs font-medium text-primary-400">AI Summary</span></div>
                <p className="text-sm text-surface-300">{activeEmail.aiSummary}</p>
              </div>
              <p className="text-sm text-surface-400 leading-relaxed">{activeEmail.preview}... We look forward to your response.</p>
              <div className="flex flex-wrap gap-2 border-t border-surface-800 pt-3">
                <button className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"><Reply className="w-3 h-3" /> Reply</button>
                <button className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"><Bot className="w-3 h-3" /> AI Draft</button>
                <button className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"><Archive className="w-3 h-3" /> Archive</button>
                <button className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-48 shrink-0 space-y-1">
          {sidebarItems.map((item) => (
            <button key={item.id} onClick={() => setSelected(item.id)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${selected === item.id ? 'bg-surface-800 text-white' : 'text-surface-400 hover:text-white hover:bg-surface-800/50'}`}>
              <item.icon className="w-4 h-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.count > 0 && <span className="text-xs bg-primary-500/20 text-primary-400 px-1.5 py-0.5 rounded-full">{item.count}</span>}
            </button>
          ))}
        </div>

        {/* Email List */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
            <button className="lg:hidden btn-ghost p-1.5 -ml-1.5 shrink-0" onClick={() => setSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors shrink-0 ${category === c ? 'bg-primary-500/20 text-primary-400' : 'bg-surface-800 text-surface-400 hover:text-white'}`}>{c}</button>
            ))}
          </div>
          <div className="card !p-0 overflow-hidden">
            <div className="divide-y divide-surface-800/50">
              {filtered.map((email) => (
                <div key={email.id} className={`p-3 sm:p-4 hover:bg-surface-800/50 transition-colors cursor-pointer ${!email.read ? 'bg-surface-800/20' : ''} ${activeEmail?.id === email.id ? 'bg-surface-800' : ''}`} onClick={() => setActiveEmail(email)}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-600/10 flex items-center justify-center text-xs font-bold text-primary-400 shrink-0">{email.from.slice(0, 2).toUpperCase()}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className={`text-sm font-medium ${!email.read ? 'text-white' : 'text-surface-300'}`}>{email.from}</span>
                        {email.starred && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${priorityColors[email.priority]} shrink-0`}>{email.priority}</span>
                        <span className="text-xs text-surface-600 ml-auto shrink-0">{email.time}</span>
                      </div>
                      <p className="text-sm text-surface-200 truncate">{email.subject}</p>
                      <p className="text-xs text-surface-500 truncate mt-0.5">{email.preview}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <Sparkles className="w-3 h-3 text-primary-400 shrink-0" />
                        <span className="text-xs text-primary-400 truncate">{email.aiSummary}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop detail panel */}
        {activeEmail && (
          <div className="hidden lg:block w-80 shrink-0 card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-600/10 flex items-center justify-center text-xs font-bold text-primary-400">{activeEmail.from.slice(0, 2).toUpperCase()}</div>
                <div><p className="text-sm font-medium text-white">{activeEmail.from}</p><p className="text-xs text-surface-500">{activeEmail.customer}</p></div>
              </div>
              <button onClick={() => setActiveEmail(null)} className="btn-ghost p-1"><ChevronDown className="w-4 h-4" /></button>
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">{activeEmail.subject}</h3>
            <p className="text-xs text-surface-400 mb-3">{activeEmail.time}</p>
            <div className="p-3 bg-primary-500/5 border border-primary-500/10 rounded-xl mb-3">
              <div className="flex items-center gap-1.5 mb-1.5"><Sparkles className="w-3.5 h-3.5 text-primary-400" /><span className="text-xs font-medium text-primary-400">AI Summary</span></div>
              <p className="text-sm text-surface-300">{activeEmail.aiSummary}</p>
            </div>
            <p className="text-sm text-surface-400 leading-relaxed mb-4">{activeEmail.preview}... We look forward to your response. Please let us know if you need any additional information.</p>
            <div className="flex flex-wrap gap-2 border-t border-surface-800 pt-3">
              <button className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"><Reply className="w-3 h-3" /> Reply</button>
              <button className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"><Bot className="w-3 h-3" /> AI Draft</button>
              <button className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"><Archive className="w-3 h-3" /> Archive</button>
              <button className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"><Trash2 className="w-3 h-3" /></button>
            </div>
          </div>
        )}
      </div>

      <ChatPanel quickActions={['Summarize today\'s emails', 'Draft reply to Sun Pharma', 'Find high-priority emails', 'Create follow-up reminder']} />
    </div>
  );
}
