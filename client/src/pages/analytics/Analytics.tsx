import { TrendingUp, Users, DollarSign, Target, BarChart3, Globe, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import PageHeader from '../../components/ui/PageHeader';
import KPIGrid from '../../components/ui/KPIGrid';
import ChartCard from '../../components/ui/ChartCard';
import type { KPICardData } from '../../components/ui/KPICard';

const kpiCards: KPICardData[] = [
  { label: 'Growth Rate', value: '14.2%', change: '+2.1%', trend: 'up', icon: TrendingUp, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
  { label: 'Net Profit', value: '₹4.8 Cr', change: '+18.3%', trend: 'up', icon: DollarSign, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
  { label: 'Total Revenue', value: '₹18.6 Cr', change: '+14.2%', trend: 'up', icon: Target, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
  { label: 'Opportunities', value: '₹8.2 Cr', change: '+32%', trend: 'up', icon: Users, iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
];

const revenueTrend = [
  { month: 'Jan', revenue: 1.2, cost: 0.8 }, { month: 'Feb', revenue: 1.5, cost: 0.9 },
  { month: 'Mar', revenue: 1.3, cost: 0.85 }, { month: 'Apr', revenue: 1.8, cost: 1.0 },
  { month: 'May', revenue: 2.0, cost: 1.1 }, { month: 'Jun', revenue: 2.3, cost: 1.2 },
];
const customerGrowth = [
  { month: 'Jan', customers: 2100, newCustomers: 120 }, { month: 'Feb', customers: 2180, newCustomers: 80 },
  { month: 'Mar', customers: 2250, newCustomers: 70 }, { month: 'Apr', customers: 2340, newCustomers: 90 },
  { month: 'May', customers: 2480, newCustomers: 140 }, { month: 'Jun', customers: 2610, newCustomers: 130 },
];
const productSales = [
  { name: 'Duloxetine', sales: 92 }, { name: 'Ibuprofen', sales: 75 },
  { name: 'Paracetamol', sales: 58 }, { name: 'Amoxicillin', sales: 44 }, { name: 'Omeprazole', sales: 31 },
];
const countrySales = [
  { country: 'India', value: 38 }, { country: 'USA', value: 22 },
  { country: 'Germany', value: 16 }, { country: 'UK', value: 12 }, { country: 'Japan', value: 8 },
];
const monthlyOrders = [
  { month: 'Jan', orders: 45 }, { month: 'Feb', orders: 52 }, { month: 'Mar', orders: 48 },
  { month: 'Apr', orders: 62 }, { month: 'May', orders: 70 }, { month: 'Jun', orders: 78 },
];
const empPerformance = [
  { name: 'Rahul S.', deals: 8 }, { name: 'Priya M.', deals: 6 },
  { name: 'Amit K.', deals: 5 }, { name: 'Neha W.', deals: 7 }, { name: 'Raj P.', deals: 4 },
];
const aiUsage = [
  { month: 'Jan', queries: 180 }, { month: 'Feb', queries: 220 }, { month: 'Mar', queries: 290 },
  { month: 'Apr', queries: 380 }, { month: 'May', queries: 520 }, { month: 'Jun', queries: 680 },
];
const emailResponse = [
  { month: 'Jan', hours: 8 }, { month: 'Feb', hours: 7.5 }, { month: 'Mar', hours: 6.8 },
  { month: 'Apr', hours: 5.2 }, { month: 'May', hours: 4.1 }, { month: 'Jun', hours: 3.5 },
];
const leadConversion = [
  { month: 'Jan', rate: 18 }, { month: 'Feb', rate: 20 }, { month: 'Mar', rate: 22 },
  { month: 'Apr', rate: 24 }, { month: 'May', rate: 26 }, { month: 'Jun', rate: 28 },
];
const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const CustomTooltip = ({ active, payload, label }: any) => active && payload?.length
  ? <div className="bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 shadow-lg"><p className="text-xs text-surface-400">{label || payload[0].name}</p>{payload.map((p: any, i: number) => <p key={i} className="text-sm font-semibold text-white">{p.name}: {p.value}{p.name === 'revenue' || p.name === 'cost' ? ' Cr' : p.name === 'rate' ? '%' : ''}</p>)}</div>
  : null;

export default function Analytics() {
  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">
      <PageHeader title="Analytics" subtitle="Comprehensive business intelligence and performance metrics" actions={<button className="btn-primary text-sm flex items-center gap-2"><Download className="w-4 h-4" /> Export Report</button>} />
      <KPIGrid cards={kpiCards} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Revenue vs Cost" icon={<TrendingUp className="w-5 h-5 text-primary-400" />}><div className="chart-height"><ResponsiveContainer width="100%" height="100%"><AreaChart data={revenueTrend}><CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" /><XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} /><Tooltip content={<CustomTooltip />} /><defs><linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient><linearGradient id="cost" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} /><stop offset="95%" stopColor="#ef4444" stopOpacity={0} /></linearGradient></defs><Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2.5} fill="url(#rev)" /><Area type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2.5} fill="url(#cost)" /></AreaChart></ResponsiveContainer></div></ChartCard>
        <ChartCard title="Customer Growth" icon={<Users className="w-5 h-5 text-primary-400" />}><div className="chart-height"><ResponsiveContainer width="100%" height="100%"><BarChart data={customerGrowth}><CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" /><XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} /><Tooltip content={<CustomTooltip />} /><Bar dataKey="newCustomers" radius={[4, 4, 0, 0]} fill="#3b82f6" /><Bar dataKey="customers" radius={[4, 4, 0, 0]} fill="#8b5cf6" /></BarChart></ResponsiveContainer></div></ChartCard>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ChartCard title="Product Sales" icon={<BarChart3 className="w-5 h-5 text-primary-400" />}><div className="chart-height-sm"><ResponsiveContainer width="100%" height="100%"><BarChart data={productSales} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" horizontal={false} /><XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={70} /><Tooltip content={<CustomTooltip />} /><Bar dataKey="sales" radius={[0, 3, 3, 0]}>{productSales.map((_, i) => <Cell key={i} fill={colors[i]} />)}</Bar></BarChart></ResponsiveContainer></div></ChartCard>
        <ChartCard title="Sales by Country" icon={<Globe className="w-5 h-5 text-primary-400" />}><div className="chart-height-sm"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={countrySales} dataKey="value" nameKey="country" cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2}>{countrySales.map((_, i) => <Cell key={i} fill={colors[i]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div></ChartCard>
        <ChartCard title="Monthly Orders" icon={<BarChart3 className="w-5 h-5 text-primary-400" />}><div className="chart-height-sm"><ResponsiveContainer width="100%" height="100%"><LineChart data={monthlyOrders}><CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" /><XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip content={<CustomTooltip />} /><Line type="monotone" dataKey="orders" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, fill: '#f59e0b', strokeWidth: 0 }} /></LineChart></ResponsiveContainer></div></ChartCard>
        <ChartCard title="Lead Conversion" icon={<Target className="w-5 h-5 text-primary-400" />}><div className="chart-height-sm"><ResponsiveContainer width="100%" height="100%"><LineChart data={leadConversion}><CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" /><XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis domain={[15, 30]} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip content={<CustomTooltip />} /><Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3, fill: '#10b981', strokeWidth: 0 }} /></LineChart></ResponsiveContainer></div></ChartCard>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartCard title="Employee Performance" icon={<Users className="w-5 h-5 text-primary-400" />}><div className="chart-height-sm"><ResponsiveContainer width="100%" height="100%"><BarChart data={empPerformance} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" horizontal={false} /><XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={65} /><Tooltip content={<CustomTooltip />} /><Bar dataKey="deals" radius={[0, 3, 3, 0]} fill="#3b82f6" /></BarChart></ResponsiveContainer></div></ChartCard>
        <ChartCard title="AI Usage" icon={<TrendingUp className="w-5 h-5 text-primary-400" />}><div className="chart-height-sm"><ResponsiveContainer width="100%" height="100%"><AreaChart data={aiUsage}><CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" /><XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip content={<CustomTooltip />} /><defs><linearGradient id="ai" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} /><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} /></linearGradient></defs><Area type="monotone" dataKey="queries" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#ai)" /></AreaChart></ResponsiveContainer></div></ChartCard>
        <ChartCard title="Email Response Time" icon={<Target className="w-5 h-5 text-primary-400" />}><div className="chart-height-sm"><ResponsiveContainer width="100%" height="100%"><AreaChart data={emailResponse}><CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" /><XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis reversed tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip content={<CustomTooltip />} /><defs><linearGradient id="er" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs><Area type="monotone" dataKey="hours" stroke="#10b981" strokeWidth={2.5} fill="url(#er)" /></AreaChart></ResponsiveContainer></div></ChartCard>
      </div>
    </div>
  );
}
