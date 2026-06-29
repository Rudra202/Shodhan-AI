import { useState } from 'react';
import { Bot, Send, Plus, History, Star, MessageSquare, Trash2, Settings, Sparkles, FileText, Users, TrendingUp, Calendar, Menu, X } from 'lucide-react';

interface Message {
  id: string; role: 'user' | 'assistant'; content: string; time: string;
}

interface Chat {
  id: string; title: string; preview: string; time: string; pinned: boolean;
}

const chats: Chat[] = [
  { id: '1', title: 'Customer Analysis - Germany', preview: 'Found 12 potential customers in Germany...', time: '2h ago', pinned: true },
  { id: '2', title: 'Email Draft - Sun Pharma', preview: 'Drafting reply for Q3 order confirmation...', time: '5h ago', pinned: true },
  { id: '3', title: 'Competitor Pricing Research', preview: 'Aarti Drugs reduced Duloxetine pricing...', time: 'Yesterday', pinned: false },
  { id: '4', title: 'Proposal for Pfizer', preview: 'Generated proposal for Duloxetine supply...', time: '2d ago', pinned: false },
  { id: '5', title: 'Meeting Summary - Cipla', preview: 'Summarized Q4 review meeting with Cipla...', time: '3d ago', pinned: false },
];

const quickActions = [
  { icon: Users, text: 'Find customers in Germany' },
  { icon: FileText, text: 'Create a proposal' },
  { icon: TrendingUp, text: 'Compare competitors' },
  { icon: Calendar, text: 'Summarize meetings' },
];

export default function AIChat() {
  const [input, setInput] = useState('');
  const [activeChat, setActiveChat] = useState('1');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', role: 'assistant', content: 'Hello! I\'m your AI assistant connected to your company data. I can help you with customers, products, sales, documents, and more. What would you like to explore?', time: '10:00 AM' },
    { id: 'm1', role: 'user', content: 'Show me all customers in Germany', time: '10:01 AM' },
    { id: 'm2', role: 'assistant', content: 'I found **3 customers** in Germany:\n\n1. **Bayer AG** — Pharma, Revenue: ₹18.6 Cr, Contact: +49-214-30-1\n2. **Merck KGaA** — Pharma, Revenue: ₹8.2 Cr, Contact: +49-6151-72-0\n3. **BioNTech SE** — Biotech, Revenue: ₹4.5 Cr, Contact: +49-6131-9084-0\n\nWould you like me to generate a report or send introductory emails to any of these?', time: '10:01 AM' },
  ]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 animate-fade-in max-w-7xl mx-auto w-full px-4 sm:px-6" style={{ height: 'calc(100dvh - 7rem)' }}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <aside className="absolute inset-y-0 left-0 w-72 bg-surface-900 border-r border-surface-800 flex flex-col animate-slide-in-left" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-3 border-b border-surface-800">
              <span className="text-sm font-semibold text-white">Chat History</span>
              <button className="btn-ghost p-1" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-3 border-b border-surface-800">
              <button className="w-full btn-primary text-sm flex items-center justify-center gap-2 py-2.5"><Plus className="w-4 h-4" /> New Chat</button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {chats.map((chat) => (
                <div key={chat.id} className={`p-2.5 rounded-xl cursor-pointer transition-colors ${activeChat === chat.id ? 'bg-surface-800' : 'hover:bg-surface-800/50'}`} onClick={() => { setActiveChat(chat.id); setSidebarOpen(false); }}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <MessageSquare className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                    <span className="text-sm font-medium text-white truncate flex-1">{chat.title}</span>
                    {chat.pinned && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
                  </div>
                  <p className="text-xs text-surface-500 truncate pl-5.5">{chat.preview}</p>
                  <p className="text-[10px] text-surface-600 pl-5.5 mt-0.5">{chat.time}</p>
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-surface-800">
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-surface-400 hover:text-white hover:bg-surface-800 rounded-xl transition-colors"><History className="w-4 h-4" />Saved Prompts</button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-64 shrink-0 flex-col bg-surface-900 border border-surface-800 rounded-2xl overflow-hidden">
        <div className="p-3 border-b border-surface-800">
          <button className="w-full btn-primary text-sm flex items-center justify-center gap-2 py-2.5"><Plus className="w-4 h-4" /> New Chat</button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chats.map((chat) => (
            <div key={chat.id} className={`p-2.5 rounded-xl cursor-pointer transition-colors ${activeChat === chat.id ? 'bg-surface-800' : 'hover:bg-surface-800/50'}`} onClick={() => setActiveChat(chat.id)}>
              <div className="flex items-center gap-2 mb-0.5">
                <MessageSquare className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                <span className="text-sm font-medium text-white truncate flex-1">{chat.title}</span>
                {chat.pinned && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
              </div>
              <p className="text-xs text-surface-500 truncate pl-5.5">{chat.preview}</p>
              <p className="text-[10px] text-surface-600 pl-5.5 mt-0.5">{chat.time}</p>
            </div>
          ))}
        </div>
        <div className="p-2 border-t border-surface-800">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-surface-400 hover:text-white hover:bg-surface-800 rounded-xl transition-colors"><History className="w-4 h-4" />Saved Prompts</button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-surface-900 border border-surface-800 rounded-2xl overflow-hidden min-w-0">
        <div className="p-4 border-b border-surface-800 flex items-center gap-3">
          <button className="lg:hidden btn-ghost p-1.5 -ml-1.5" onClick={() => setSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
          <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center"><Bot className="w-4 h-4 text-primary-400" /></div>
          <div><h2 className="text-sm font-semibold text-white">AI Assistant</h2><p className="text-xs text-surface-500">Connected to your company knowledge base</p></div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
              {m.role === 'assistant' && <div className="w-7 h-7 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0 mt-0.5"><Bot className="w-3.5 h-3.5 text-primary-400" /></div>}
              <div className={`max-w-[85%] sm:max-w-[75%] lg:max-w-[65%] ${m.role === 'user' ? 'bg-primary-600 rounded-2xl rounded-tr-md px-4 py-2.5' : 'bg-surface-800 rounded-2xl rounded-tl-md px-4 py-2.5'}`}>
                <p className={`text-sm whitespace-pre-wrap ${m.role === 'user' ? 'text-white' : 'text-surface-200'}`}>{m.content}</p>
                <p className={`text-[10px] mt-1 ${m.role === 'user' ? 'text-primary-200' : 'text-surface-600'}`}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-surface-800 space-y-3">
          <div className="flex flex-wrap gap-2">{quickActions.map((q) => (
            <button key={q.text} onClick={() => setInput(q.text)} className="text-xs px-3 py-1.5 bg-surface-800 hover:bg-surface-700 text-surface-400 hover:text-surface-200 rounded-lg border border-surface-700 transition-colors flex items-center gap-1.5">
              <q.icon className="w-3 h-3" />{q.text}
            </button>
          ))}</div>
          <div className="flex gap-2"><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { setMessages((prev) => [...prev, { id: String(Date.now()), role: 'user', content: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]); setInput(''); } }} placeholder="Ask anything about your business..." className="input-field text-sm flex-1" /><button className="btn-primary px-4"><Send className="w-4 h-4" /></button></div>
        </div>
      </div>
    </div>
  );
}
