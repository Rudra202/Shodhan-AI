import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import {
  TrendingUp, Users, Mail, Target, DollarSign, Zap, Activity, Calendar,
  FileText, Bot, AlertTriangle, Bell, BarChart3, PieChart, MessageSquare, ArrowUp,
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import PageHeader from '../../components/ui/PageHeader';
import KPIGrid from '../../components/ui/KPIGrid';
import ChartCard from '../../components/ui/ChartCard';
import ActivityFeed from '../../components/ui/ActivityFeed';
import AISuggestions from '../../components/ui/AISuggestions';
import ChatPanel from '../../components/ui/ChatPanel';
import type { KPICardData } from '../../components/ui/KPICard';
import { PageSkeleton } from '../../components/ui/LoadingSkeleton';
import type { ActivityItem } from '../../components/ui/ActivityFeed';
import type { Suggestion } from '../../components/ui/AISuggestions';

// ── Mock Data ─────────────────────────────────────────────
const revenueData = [
  { month: 'Jan', revenue: 28 }, { month: 'Feb', revenue: 35 },
  { month: 'Mar', revenue: 32 }, { month: 'Apr', revenue: 42 },
  { month: 'May', revenue: 48 }, { month: 'Jun', revenue: 55 },
];
const growthData = [
  { month: 'Jan', customers: 60 }, { month: 'Feb', customers: 72 },
  { month: 'Mar', customers: 85 }, { month: 'Apr', customers: 78 },
  { month: 'May', customers: 95 }, { month: 'Jun', customers: 110 },
];
const productData = [
  { name: 'Duloxetine', sales: 92 }, { name: 'Ibuprofen', sales: 75 },
  { name: 'Paracetamol', sales: 58 }, { name: 'Amoxicillin', sales: 44 },
  { name: 'Omeprazole', sales: 31 },
];
const dealPipeline = [
  { stage: 'Lead', value: 42, color: '#3b82f6' },
  { stage: 'Proposal', value: 28, color: '#8b5cf6' },
  { stage: 'Negotiation', value: 18, color: '#f59e0b' },
  { stage: 'Won', value: 12, color: '#10b981' },
  { stage: 'Lost', value: 6, color: '#ef4444' },
];
const emailStats = [
  { label: 'Unread', value: 23, color: '#3b82f6' },
  { label: 'Pending', value: 15, color: '#f59e0b' },
  { label: 'Replied', value: 42, color: '#10b981' },
  { label: 'AI Drafted', value: 31, color: '#8b5cf6' },
  { label: 'Follow Ups', value: 8, color: '#ef4444' },
];

const kpiCards: KPICardData[] = [
  { label: "Today's Revenue", value: '₹4.2 Cr', change: '+12.5%', trend: 'up', icon: DollarSign, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
  { label: 'Active Customers', value: '2,847', change: '+8.2%', trend: 'up', icon: Users, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
  { label: 'Pending Emails', value: '143', change: '-3.1%', trend: 'down', icon: Mail, iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
  { label: 'Open Leads', value: '57', change: '+24.3%', trend: 'up', icon: Target, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
];

const suggestions: Suggestion[] = [
  { title: 'Follow-up Reminder', desc: '3 customers haven\'t responded to your last email. Follow-up suggested.', icon: Bell },
  { title: 'Competitor Alert', desc: 'Aarti Drugs reduced Duloxetine pricing by 8%. Consider reviewing your strategy.', icon: AlertTriangle },
  { title: 'Meeting Summary', desc: 'Today: 2 meetings scheduled — Cipla (10 AM) and Lupin (3 PM).', icon: Calendar },
];

const activityFeed: ActivityItem[] = [
  { icon: FileText, text: 'AI generated proposal for Pfizer', time: '10:30 AM' },
  { icon: Users, text: 'New customer found in Japan', time: '10:42 AM' },
  { icon: TrendingUp, text: 'Competitor price changed', time: '11:10 AM' },
  { icon: Calendar, text: 'Meeting summary completed', time: '11:25 AM' },
  { icon: Mail, text: 'Email draft ready for Lupin', time: '11:40 AM' },
];

const recentDocs: ActivityItem[] = [
  { icon: FileText, text: 'WHO Certificate.pdf · Uploaded 2 mins ago', time: '2 mins ago' },
  { icon: FileText, text: 'API Brochure.pdf · Uploaded Yesterday', time: 'Yesterday' },
  { icon: FileText, text: 'Research.pdf · Modified Monday', time: 'Monday' },
  { icon: FileText, text: 'Q4 Report.xlsx · Shared Last week', time: 'Last week' },
];

const productColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-xs text-surface-400">{label}</p>
        <p className="text-sm font-semibold text-white">{payload[0].value}{payload[0].name === 'revenue' ? 'L' : ''}</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { user } = useAuthStore();
  const [selectedPeriod, setSelectedPeriod] = useState('This Year');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <PageSkeleton charts={2} tableRows={0} />;

  const greet = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">
      <PageHeader
        title={`${greet()}, ${user?.name?.split(' ')[0] || 'User'}`}
        subtitle={today}
        actions={
          <>
            <span className="px-3 py-1.5 text-xs font-medium bg-primary-500/10 text-primary-400 rounded-full border border-primary-500/20">
              AI Summary Available
            </span>
            <span className="px-3 py-1.5 text-xs font-medium bg-green-500/10 text-green-400 rounded-full border border-green-500/20 flex items-center gap-1.5">
              <Zap className="w-3 h-3" /> All Systems Operational
            </span>
          </>
        }
      />

      <KPIGrid cards={kpiCards} />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Revenue Trend" icon={<TrendingUp className="w-5 h-5 text-primary-400" />}
          action={
            <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-xs bg-surface-800 border border-surface-700 rounded-lg px-2 py-1 text-surface-400 focus:outline-none">
              <option>This Year</option><option>Last Quarter</option>
            </select>
          }
        >
          <div className="chart-height">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: '#3b82f6', strokeWidth: 0, r: 4 }} activeDot={{ r: 6, fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Customer Growth" icon={<Users className="w-5 h-5 text-primary-400" />}>
          <div className="chart-height">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={2.5} fill="url(#cg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ChartCard title="Product Sales" icon={<BarChart3 className="w-5 h-5 text-primary-400" />} className="lg:col-span-1">
          <div className="chart-height-sm">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={85} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="sales" radius={[0, 4, 4, 0]}>
                  {productData.map((_, i) => <Cell key={i} fill={productColors[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Deal Pipeline" icon={<PieChart className="w-5 h-5 text-primary-400" />} className="lg:col-span-1">
          <div className="space-y-3">
            {dealPipeline.map((d) => (
              <div key={d.stage}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-surface-300">{d.stage}</span>
                  <span className="text-surface-400 font-medium">{d.value}</span>
                </div>
                <div className="w-full h-2 bg-surface-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(d.value / 42) * 100}%`, backgroundColor: d.color }} />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Email Stats" icon={<Mail className="w-5 h-5 text-primary-400" />} className="lg:col-span-1">
          <div className="space-y-3">
            {emailStats.map((e) => (
              <div key={e.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-surface-300">{e.label}</span>
                  <span className="text-surface-400 font-medium">{e.value}</span>
                </div>
                <div className="w-full h-2 bg-surface-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(e.value / 42) * 100}%`, backgroundColor: e.color }} />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="AI Usage" icon={<Zap className="w-5 h-5 text-primary-400" />} className="lg:col-span-1">
          <div className="space-y-4">
            {[
              { label: 'Questions Asked', value: '1,247', icon: MessageSquare, color: 'text-blue-400' },
              { label: 'Documents Processed', value: '843', icon: FileText, color: 'text-purple-400' },
              { label: 'Emails Summarized', value: '562', icon: Mail, color: 'text-emerald-400' },
              { label: 'Pitches Generated', value: '128', icon: Zap, color: 'text-amber-400' },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                  <span className="text-sm text-surface-300">{s.label}</span>
                </div>
                <span className="text-sm font-semibold text-white">{s.value}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <AISuggestions items={suggestions} />

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ActivityFeed items={activityFeed} title="AI Activity Feed" icon={Activity} />
        <ActivityFeed items={recentDocs} title="Recent Documents" icon={FileText} />
      </div>

      <ChatPanel quickActions={[
        "Show all customers in Germany",
        "Summarize today's emails",
        "Create a proposal",
        "Find competitor pricing",
      ]} />
    </div>
  );
}
