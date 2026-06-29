import { useState } from 'react';
import { DollarSign, TrendingUp, Target, XCircle, BarChart3, PieChart as PieChartIcon, Globe, Download, ChevronDown, ChevronUp, Phone, Mail, Building2 } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import PageHeader from '../../components/ui/PageHeader';
import KPIGrid from '../../components/ui/KPIGrid';
import ChartCard from '../../components/ui/ChartCard';
import type { KPICardData } from '../../components/ui/KPICard';

const kpiCards: KPICardData[] = [
  { label: 'Total Revenue', value: '₹18.6 Cr', change: '+14.2%', trend: 'up', icon: DollarSign, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
  { label: 'Active Leads', value: '48', change: '+22%', trend: 'up', icon: Target, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
  { label: 'Won Deals', value: '12', change: '+8.3%', trend: 'up', icon: TrendingUp, iconBg: 'bg-green-500/10', iconColor: 'text-green-400' },
  { label: 'Lost Deals', value: '6', change: '-2.1%', trend: 'down', icon: XCircle, iconBg: 'bg-red-500/10', iconColor: 'text-red-400' },
];

const pipelineStages = [
  { stage: 'Lead', value: 42, color: '#3b82f6' },
  { stage: 'Qualified', value: 28, color: '#8b5cf6' },
  { stage: 'Proposal', value: 18, color: '#f59e0b' },
  { stage: 'Negotiation', value: 10, color: '#ec4899' },
  { stage: 'Won', value: 12, color: '#10b981' },
];

const leads = [
  { id: '1', company: 'Bayer AG', product: 'Ibuprofen', value: '₹2.4 Cr', stage: 'Negotiation', owner: 'Rahul S.', contact: '+49-214-30-1', email: 'info@bayer.com' },
  { id: '2', company: 'GSK Plc', product: 'Amoxicillin', value: '₹1.8 Cr', stage: 'Proposal', owner: 'Priya M.', contact: '+44-20-8047-5000', email: 'contact@gsk.com' },
  { id: '3', company: 'Novo Nordisk', product: 'Omeprazole', value: '₹1.2 Cr', stage: 'Qualified', owner: 'Amit K.', contact: '+45-44-44-88-88', email: 'info@novonordisk.com' },
  { id: '4', company: 'Roche AG', product: 'Duloxetine', value: '₹3.1 Cr', stage: 'Lead', owner: 'Neha W.', contact: '+41-61-687-1111', email: 'contact@roche.com' },
  { id: '5', company: 'Sanofi SA', product: 'Paracetamol', value: '₹0.9 Cr', stage: 'Negotiation', owner: 'Raj P.', contact: '+33-1-53-77-40-00', email: 'info@sanofi.com' },
  { id: '6', company: 'Merck KGaA', product: 'Duloxetine', value: '₹2.7 Cr', stage: 'Proposal', owner: 'Sarah C.', contact: '+49-6151-72-0', email: 'contact@merckgroup.com' },
];

const monthlyRevenue = [
  { month: 'Jan', revenue: 1.2, target: 1.5 }, { month: 'Feb', revenue: 1.5, target: 1.5 },
  { month: 'Mar', revenue: 1.3, target: 1.6 }, { month: 'Apr', revenue: 1.8, target: 1.6 },
  { month: 'May', revenue: 2.0, target: 1.8 }, { month: 'Jun', revenue: 2.3, target: 1.8 },
];
const winLossData = [
  { name: 'Won', value: 12 }, { name: 'Lost', value: 6 }, { name: 'Pipeline', value: 30 },
];
const salesByCountry = [
  { country: 'India', value: 38 }, { country: 'USA', value: 22 },
  { country: 'Germany', value: 16 }, { country: 'UK', value: 12 }, { country: 'Japan', value: 8 },
];
const stageColors: Record<string, string> = {
  Lead: 'bg-blue-500/10 text-blue-400', Qualified: 'bg-purple-500/10 text-purple-400',
  Proposal: 'bg-amber-500/10 text-amber-400', Negotiation: 'bg-pink-500/10 text-pink-400',
  Won: 'bg-emerald-500/10 text-emerald-400',
};
const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const CustomTooltip = ({ active, payload, label }: any) => (
  active && payload?.length
    ? <div className="bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 shadow-lg"><p className="text-xs text-surface-400">{label || payload[0].name}</p><p className="text-sm font-semibold text-white">{payload[0].value}{payload[0].name === 'revenue' || payload[0].name === 'target' ? ' Cr' : ''}</p></div>
    : null
);

export default function Sales() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">
      <PageHeader title="Sales" subtitle="Track your pipeline, manage deals, and forecast revenue" actions={<button className="btn-primary text-sm flex items-center gap-2"><Download className="w-4 h-4" /> Export Report</button>} />
      <KPIGrid cards={kpiCards} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ChartCard title="Sales Pipeline" icon={<BarChart3 className="w-5 h-5 text-primary-400" />} className="lg:col-span-1">
          <div className="space-y-3">{pipelineStages.map((p) => <div key={p.stage}><div className="flex items-center justify-between text-sm mb-1"><span className="text-surface-300">{p.stage}</span><span className="text-surface-400 font-medium">{p.value}</span></div><div className="w-full h-2.5 bg-surface-800 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${(p.value / 42) * 100}%`, backgroundColor: p.color }} /></div></div>)}</div>
        </ChartCard>
        <ChartCard title="Monthly Revenue" icon={<TrendingUp className="w-5 h-5 text-primary-400" />} className="lg:col-span-1">
          <div className="chart-height-sm"><ResponsiveContainer width="100%" height="100%"><AreaChart data={monthlyRevenue}><CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" /><XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip content={<CustomTooltip />} /><defs><linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs><Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2.5} fill="url(#revGrad)" /><Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} /></AreaChart></ResponsiveContainer></div>
        </ChartCard>
        <ChartCard title="Win / Loss Ratio" icon={<PieChartIcon className="w-5 h-5 text-primary-400" />} className="lg:col-span-1">
          <div className="chart-height-sm flex items-center justify-center"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={winLossData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3}>{winLossData.map((_, i) => <Cell key={i} fill={['#10b981', '#ef4444', '#3b82f6'][i]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
          <div className="flex justify-center gap-4 text-xs text-surface-400 mt-2">{winLossData.map((d, i) => <div key={d.name} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ['#10b981', '#ef4444', '#3b82f6'][i] }} />{d.name} ({d.value})</div>)}</div>
        </ChartCard>
        <ChartCard title="Sales by Country" icon={<Globe className="w-5 h-5 text-primary-400" />} className="lg:col-span-1">
          <div className="chart-height-sm"><ResponsiveContainer width="100%" height="100%"><BarChart data={salesByCountry} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" horizontal={false} /><XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis dataKey="country" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip content={<CustomTooltip />} /><Bar dataKey="value" radius={[0, 4, 4, 0]}>{salesByCountry.map((_, i) => <Cell key={i} fill={colors[i]} />)}</Bar></BarChart></ResponsiveContainer></div>
        </ChartCard>
      </div>

      <div className="card"><h3 className="text-base font-semibold text-white mb-4">Active Leads / Deals</h3><div className="space-y-2">{leads.map((lead) => (<div key={lead.id}><div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-800 transition-colors cursor-pointer" onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}><div className="flex items-center gap-3"><Building2 className="w-4 h-4 text-surface-400" /><div><p className="text-sm font-medium text-white">{lead.company}</p><p className="text-xs text-surface-500">{lead.product} · {lead.value}</p></div></div><div className="flex items-center gap-3"><span className={`text-xs px-2 py-1 rounded-full ${stageColors[lead.stage] || ''}`}>{lead.stage}</span><span className="text-xs text-surface-500">{lead.owner}</span>{expanded === lead.id ? <ChevronUp className="w-4 h-4 text-surface-400" /> : <ChevronDown className="w-4 h-4 text-surface-400" />}</div></div>{expanded === lead.id && <div className="ml-10 mb-2 p-3 bg-surface-800/50 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-3"><div className="flex items-center gap-2 text-sm text-surface-400"><Phone className="w-3.5 h-3.5" />{lead.contact}</div><div className="flex items-center gap-2 text-sm text-surface-400"><Mail className="w-3.5 h-3.5" />{lead.email}</div></div>}</div>))}</div></div>
    </div>
  );
}
