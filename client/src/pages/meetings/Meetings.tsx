import { useState } from 'react';
import { Calendar, Clock, Users, Video, MapPin, Bot, Plus, ChevronLeft, ChevronRight, CheckCircle, X, FileText } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import KPIGrid from '../../components/ui/KPIGrid';
import type { KPICardData } from '../../components/ui/KPICard';

const kpiCards: KPICardData[] = [
  { label: 'Today\'s Meetings', value: '4', change: '+1', trend: 'up', icon: Calendar, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
  { label: 'This Week', value: '12', change: '+3', trend: 'up', icon: Clock, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
  { label: 'Completed', value: '28', change: '+40%', trend: 'up', icon: CheckCircle, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
  { label: 'Action Items', value: '15', change: '-5', trend: 'down', icon: FileText, iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
];

const meetings = [
  { id: '1', title: 'Q4 Planning - Bayer AG', time: '10:00 AM', duration: '1h', date: 'Today', attendees: 6, type: 'video', status: 'upcoming' },
  { id: '2', title: 'Team Stand-up', time: '11:30 AM', duration: '30m', date: 'Today', attendees: 8, type: 'in-person', status: 'upcoming' },
  { id: '3', title: 'Sun Pharma - Price Negotiation', time: '2:00 PM', duration: '45m', date: 'Today', attendees: 4, type: 'video', status: 'upcoming' },
  { id: '4', title: 'New Product Review', time: '4:00 PM', duration: '1h', date: 'Today', attendees: 5, type: 'in-person', status: 'upcoming' },
  { id: '5', title: 'Cipla Q4 Review', time: '10:00 AM', duration: '1h', date: 'Yesterday', attendees: 6, type: 'video', status: 'completed', summary: 'Reviewed Q4 performance. Duloxetine sales up 12%. New targets set for Q1.', actionItems: ['Send updated pricing to Cipla', 'Follow up on compliance docs', 'Schedule next review'] },
  { id: '6', title: 'FDA Compliance Update', time: '3:00 PM', duration: '45m', date: 'Yesterday', attendees: 3, type: 'video', status: 'completed', summary: 'FDA audit scheduled for next month. All documents need to be ready.', actionItems: ['Prepare GMP certificates', 'Update SOP documents', 'Schedule mock audit'] },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const today = new Date();
const startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - today.getDay() + 1);

export default function Meetings() {
  const [selected, setSelected] = useState<string | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">
      <PageHeader title="Meetings" subtitle="Schedule, manage, and get AI summaries of your meetings" actions={<button className="btn-primary text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Schedule</button>} />
      <KPIGrid cards={kpiCards} />

      {/* Calendar strip */}
      <div className="card"><div className="flex items-center justify-between mb-3"><button onClick={() => setWeekOffset(weekOffset - 1)} className="btn-ghost p-1"><ChevronLeft className="w-4 h-4" /></button><h3 className="text-sm font-semibold text-white">This Week</h3><button onClick={() => setWeekOffset(weekOffset + 1)} className="btn-ghost p-1"><ChevronRight className="w-4 h-4" /></button></div><div className="grid grid-cols-7 gap-2">{days.map((d, i) => { const date = new Date(startOfWeek); date.setDate(date.getDate() + i + weekOffset * 7); const isToday = date.toDateString() === today.toDateString(); return (<div key={d} className={`p-2 rounded-xl text-center ${isToday ? 'bg-primary-500/20 ring-1 ring-primary-500' : 'bg-surface-800/50'}`}><p className="text-xs text-surface-500">{d}</p><p className={`text-lg font-bold ${isToday ? 'text-primary-400' : 'text-white'}`}>{date.getDate()}</p><p className="text-[10px] text-surface-500">{date.toLocaleDateString('en', { month: 'short' })}</p></div>); })}</div></div>

      {/* Meeting List */}
      <div className="space-y-3">{meetings.map((m) => {
        const isExpanded = selected === m.id;
        return (<div key={m.id} className={`card cursor-pointer ${isExpanded ? 'ring-1 ring-primary-500' : ''}`} onClick={() => setSelected(isExpanded ? null : m.id)}>
          <div className="flex items-start justify-between gap-4"><div className="flex items-start gap-3 min-w-0"><div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${m.status === 'completed' ? 'bg-emerald-500/10' : 'bg-primary-500/10'}`}>{m.type === 'video' ? <Video className={`w-5 h-5 ${m.status === 'completed' ? 'text-emerald-400' : 'text-primary-400'}`} /> : <Users className={`w-5 h-5 ${m.status === 'completed' ? 'text-emerald-400' : 'text-primary-400'}`} />}</div><div><h3 className="font-semibold text-white">{m.title}</h3><div className="flex items-center gap-3 mt-1 text-xs text-surface-500"><span>{m.date} · {m.time}</span><span>{m.duration}</span><span>{m.attendees} attendees</span></div></div></div><span className={`text-xs px-2 py-1 rounded-full shrink-0 ${m.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-primary-500/10 text-primary-400'}`}>{m.status}</span></div>
          {isExpanded && m.status === 'completed' && (<div className="mt-3 pt-3 border-t border-surface-800 space-y-3"><div className="p-3 bg-primary-500/5 border border-primary-500/10 rounded-xl"><div className="flex items-center gap-1.5 mb-1.5"><Bot className="w-3.5 h-3.5 text-primary-400" /><span className="text-xs font-medium text-primary-400">AI Summary</span></div><p className="text-sm text-surface-300">{m.summary}</p></div><div><p className="text-sm font-medium text-white mb-2">Action Items</p><div className="space-y-1.5">{m.actionItems?.map((item) => (<div key={item} className="flex items-center gap-2 text-sm text-surface-400"><input type="checkbox" className="rounded border-surface-600 bg-surface-800 accent-primary-500" /><span>{item}</span></div>))}</div></div></div>)}
        </div>);
      })}</div>
    </div>
  );
}
