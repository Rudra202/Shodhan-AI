import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield, Bot, Edit2, Camera, CheckSquare, Clock, Award, TrendingUp } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import KPIGrid from '../../components/ui/KPIGrid';
import ChartCard from '../../components/ui/ChartCard';
import type { KPICardData } from '../../components/ui/KPICard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const kpiCards: KPICardData[] = [
  { label: 'Tasks Completed', value: '142', change: '+18', trend: 'up', icon: CheckSquare, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
  { label: 'Deals Closed', value: '24', change: '+4', trend: 'up', icon: Award, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
  { label: 'Avg Response Time', value: '2.4h', change: '-0.8h', trend: 'up', icon: Clock, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
  { label: 'Performance', value: '94%', change: '+6%', trend: 'up', icon: TrendingUp, iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
];

const perfData = [
  { month: 'Jan', tasks: 18, deals: 3 }, { month: 'Feb', tasks: 22, deals: 4 },
  { month: 'Mar', tasks: 20, deals: 3 }, { month: 'Apr', tasks: 26, deals: 5 },
  { month: 'May', tasks: 30, deals: 5 }, { month: 'Jun', tasks: 26, deals: 4 },
];

const CustomTooltip = ({ active, payload, label }: any) => active && payload?.length
  ? <div className="bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 shadow-lg"><p className="text-xs text-surface-400">{label}</p>{payload.map((p: any, i: number) => <p key={i} className="text-sm font-semibold text-white">{p.name}: {p.value}</p>)}</div>
  : null;

export default function Profile() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">
      <PageHeader title="Profile" subtitle="Manage your personal information and view performance" actions={<button onClick={() => setEditing(!editing)} className="btn-primary text-sm flex items-center gap-2"><Edit2 className="w-4 h-4" /> {editing ? 'Save Profile' : 'Edit Profile'}</button>} />
      <KPIGrid cards={kpiCards} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="card lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="relative group mb-4">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">JD</div>
              <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-surface-800 border-2 border-surface-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Camera className="w-4 h-4 text-surface-300" /></button>
            </div>
            <h2 className="text-xl font-bold text-white">John Doe</h2>
            <p className="text-sm text-surface-400">Senior Product Manager</p>
            <div className="flex items-center gap-1 mt-1"><Shield className="w-3 h-3 text-emerald-400" /><span className="text-xs text-emerald-400">Verified Account</span></div>
            <div className="w-full mt-6 space-y-3">
              {[
                { icon: Mail, label: 'john@shodhanai.com' },
                { icon: Phone, label: '+1 (555) 123-4567' },
                { icon: MapPin, label: 'San Francisco, CA' },
                { icon: Calendar, label: 'Joined Jan 2024' },
              ].map((item) => {
                const Icon = item.icon;
                return (<div key={item.label} className="flex items-center gap-3 text-sm text-surface-300"><Icon className="w-4 h-4 text-surface-500" />{item.label}</div>);
              })}
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="lg:col-span-2 space-y-6">
          <ChartCard title="Performance Overview" icon={<TrendingUp className="w-5 h-5 text-primary-400" />}><div className="chart-height"><ResponsiveContainer width="100%" height="100%"><AreaChart data={perfData}><CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" /><XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} /><Tooltip content={<CustomTooltip />} /><defs><linearGradient id="tasks" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient><linearGradient id="deals" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs><Area type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={2.5} fill="url(#tasks)" /><Area type="monotone" dataKey="deals" stroke="#10b981" strokeWidth={2.5} fill="url(#deals)" /></AreaChart></ResponsiveContainer></div></ChartCard>

          <div className="card"><h3 className="text-base font-semibold text-white mb-4">About</h3>{editing ? (<textarea className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-white placeholder-surface-500 focus:outline-none focus:border-primary-500 h-24" defaultValue="Experienced product manager with a passion for AI-driven solutions..." />) : (<p className="text-sm text-surface-300 leading-relaxed">Experienced product manager with a passion for AI-driven solutions. Leading product development for Shodhan AI platform with a focus on enterprise features and user experience. Skilled in cross-functional team management and data-driven decision making.</p>)}</div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card"><h3 className="text-sm font-semibold text-white mb-3">Skills</h3><div className="flex flex-wrap gap-2">{['Product Strategy', 'AI/ML', 'Data Analysis', 'UI/UX', 'Agile', 'Leadership', 'A/B Testing', 'Roadmapping'].map((s) => <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-primary-500/10 text-primary-400">{s}</span>)}</div></div>
            <div className="card"><h3 className="text-sm font-semibold text-white mb-3">Recent Activity</h3><div className="space-y-2">{['Completed Q4 Planning', 'Reviewed AI Chat PR', 'Updated roadmap', 'Met with Bayer team'].map((a) => <div key={a} className="flex items-center gap-2 text-sm text-surface-400"><div className="w-1.5 h-1.5 rounded-full bg-primary-500" />{a}</div>)}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
