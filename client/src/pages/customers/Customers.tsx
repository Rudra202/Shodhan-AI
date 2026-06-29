import { useState, useEffect } from 'react';
import {
  Users, UserPlus, UserCheck, UserX, DollarSign, TrendingUp,
  Globe, Building2, ShoppingBag, BarChart3, X, Mail, Phone,
  Calendar, FileText, Bot, MapPin, Activity, Target, Download,
} from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line,
} from 'recharts';
import PageHeader from '../../components/ui/PageHeader';
import KPIGrid from '../../components/ui/KPIGrid';
import ChartCard from '../../components/ui/ChartCard';
import DataTable from '../../components/ui/DataTable';
import FilterBar from '../../components/ui/FilterBar';
import { PageSkeleton } from '../../components/ui/LoadingSkeleton';
import EmptyState from '../../components/ui/EmptyState';
import type { KPICardData } from '../../components/ui/KPICard';
import type { Column } from '../../components/ui/DataTable';

// ── Types ────────────────────────────────────────────────
interface Customer {
  id: string;
  company: string;
  logo: string;
  country: string;
  products: string;
  revenue: string;
  status: 'Active' | 'Inactive' | 'Lead';
  manager: string;
  email: string;
  phone: string;
  industry: string;
}

interface CustomerDetail extends Customer {
  totalRevenue: string;
  since: string;
  about: string;
  activities: { type: string; text: string; time: string }[];
}

// ── Mock Data ─────────────────────────────────────────────
const kpiCards: KPICardData[] = [
  { label: 'Total Customers', value: '2,847', change: '+12.5%', trend: 'up', icon: Users, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
  { label: 'New This Month', value: '186', change: '+8.2%', trend: 'up', icon: UserPlus, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
  { label: 'Active Customers', value: '2,341', change: '+5.3%', trend: 'up', icon: UserCheck, iconBg: 'bg-green-500/10', iconColor: 'text-green-400' },
  { label: 'Lost Customers', value: '127', change: '-2.1%', trend: 'down', icon: UserX, iconBg: 'bg-red-500/10', iconColor: 'text-red-400' },
];

const customers: Customer[] = [
  { id: '1', company: 'Pfizer Inc.', logo: 'PF', country: 'USA', products: 'Duloxetine, Ibuprofen', revenue: '₹12.4 Cr', status: 'Active', manager: 'Rahul S.', email: 'contact@pfizer.com', phone: '+1-212-733-2323', industry: 'Pharma' },
  { id: '2', company: 'Sun Pharma', logo: 'SP', country: 'India', products: 'Paracetamol, Omeprazole', revenue: '₹8.7 Cr', status: 'Active', manager: 'Priya M.', email: 'info@sunpharma.com', phone: '+91-22-432-1000', industry: 'Pharma' },
  { id: '3', company: 'Aarti Drugs', logo: 'AD', country: 'India', products: 'Duloxetine, Amoxicillin', revenue: '₹5.2 Cr', status: 'Active', manager: 'Amit K.', email: 'sales@aartidrugs.com', phone: '+91-22-456-7890', industry: 'Pharma' },
  { id: '4', company: 'Cipla Ltd.', logo: 'CL', country: 'India', products: 'Ibuprofen, Paracetamol', revenue: '₹6.8 Cr', status: 'Active', manager: 'Neha W.', email: 'info@cipla.com', phone: '+91-22-478-2000', industry: 'Pharma' },
  { id: '5', company: 'Novartis AG', logo: 'NV', country: 'Switzerland', products: 'Omeprazole, Amoxicillin', revenue: '₹15.2 Cr', status: 'Active', manager: 'Raj P.', email: 'contact@novartis.com', phone: '+41-61-324-1111', industry: 'Pharma' },
  { id: '6', company: 'Lupin Ltd.', logo: 'LL', country: 'India', products: 'Duloxetine, Paracetamol', revenue: '₹4.5 Cr', status: 'Inactive', manager: 'Vikram S.', email: 'info@lupin.com', phone: '+91-22-492-5000', industry: 'Pharma' },
  { id: '7', company: 'Zydus Life', logo: 'ZL', country: 'India', products: 'Amoxicillin, Ibuprofen', revenue: '₹3.9 Cr', status: 'Active', manager: 'Deepa R.', email: 'contact@zydus.com', phone: '+91-79-456-8000', industry: 'Pharma' },
  { id: '8', company: 'Bayer AG', logo: 'BY', country: 'Germany', products: 'Ibuprofen, Paracetamol', revenue: '₹18.6 Cr', status: 'Lead', manager: 'Marcus W.', email: 'info@bayer.com', phone: '+49-214-30-1', industry: 'Pharma' },
  { id: '9', company: 'GSK Plc', logo: 'GS', country: 'UK', products: 'Omeprazole, Amoxicillin', revenue: '₹14.1 Cr', status: 'Active', manager: 'Sarah C.', email: 'contact@gsk.com', phone: '+44-20-8047-5000', industry: 'Pharma' },
  { id: '10', company: 'Torrent Pharma', logo: 'TP', country: 'India', products: 'Duloxetine', revenue: '₹2.8 Cr', status: 'Inactive', manager: 'Kiran J.', email: 'info@torrentpharma.com', phone: '+91-79-456-9000', industry: 'Pharma' },
];

const countryData = [
  { country: 'India', value: 45 }, { country: 'USA', value: 18 },
  { country: 'Germany', value: 12 }, { country: 'UK', value: 10 },
  { country: 'Switzerland', value: 8 }, { country: 'Japan', value: 7 },
];
const revenueByCustomer = [
  { name: 'Bayer', rev: 18.6 }, { name: 'Novartis', rev: 15.2 },
  { name: 'GSK', rev: 14.1 }, { name: 'Pfizer', rev: 12.4 },
  { name: 'Sun Pharma', rev: 8.7 }, { name: 'Cipla', rev: 6.8 },
];
const growthData = [
  { month: 'Jan', total: 2100 }, { month: 'Feb', total: 2180 },
  { month: 'Mar', total: 2250 }, { month: 'Apr', total: 2340 },
  { month: 'May', total: 2480 }, { month: 'Jun', total: 2610 },
];
const retentionData = [
  { month: 'Jan', retained: 92 }, { month: 'Feb', retained: 90 },
  { month: 'Mar', retained: 93 }, { month: 'Apr', retained: 91 },
  { month: 'May', retained: 94 }, { month: 'Jun', retained: 93 },
];

const detailRecord: Record<string, CustomerDetail> = {
  '1': {
    ...customers[0],
    totalRevenue: '₹12.4 Cr',
    since: 'Jan 2022',
    about: 'Pfizer Inc. is one of the world\'s largest pharmaceutical companies, headquartered in New York. They are a key partner for our Duloxetine and Ibuprofen product lines.',
    activities: [
      { type: 'email', text: 'Quote sent for Q3 Duloxetine order', time: '2h ago' },
      { type: 'meeting', text: 'Quarterly review scheduled for next week', time: '5h ago' },
      { type: 'document', text: 'FDA certificate uploaded to shared drive', time: '1d ago' },
      { type: 'insight', text: 'AI detected potential demand increase for Duloxetine', time: '2d ago' },
      { type: 'task', text: 'Follow up on pending compliance documents', time: '3d ago' },
    ],
  },
};

const countryColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
const statusColors: Record<string, string> = { Active: 'text-emerald-400 bg-emerald-500/10', Inactive: 'text-red-400 bg-red-500/10', Lead: 'text-amber-400 bg-amber-500/10' };

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-xs text-surface-400">{label || payload[0].name}</p>
        <p className="text-sm font-semibold text-white">{payload[0].value}{payload[0].name === 'rev' ? ' Cr' : payload[0].name === 'total' ? '' : '%'}</p>
      </div>
    );
  }
  return null;
};

export default function Customers() {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Customer | null>(null);
  const [filters, setFilters] = useState({ country: '', status: '', industry: '', product: '', manager: '' });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <PageSkeleton charts={4} tableRows={5} />;

  const filtered = customers.filter((c) => {
    if (filters.country && c.country !== filters.country) return false;
    if (filters.status && c.status !== filters.status) return false;
    if (filters.industry && c.industry !== filters.industry) return false;
    if (filters.manager && c.manager !== filters.manager) return false;
    return true;
  });

  const columns: Column<Customer>[] = [
    {
      key: 'company', label: 'Company',
      render: (r) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-600/10 flex items-center justify-center text-xs font-bold text-primary-400">{r.logo}</div>
          <span className="font-medium text-white">{r.company}</span>
        </div>
      ),
    },
    { key: 'country', label: 'Country', render: (r) => <div className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-surface-500" />{r.country}</div> },
    { key: 'products', label: 'Products', className: 'hidden lg:table-cell' },
    { key: 'revenue', label: 'Revenue', render: (r) => <span className="font-medium text-white">{r.revenue}</span> },
    {
      key: 'status', label: 'Status',
      render: (r) => <span className={`text-xs px-2 py-1 rounded-full ${statusColors[r.status]}`}>{r.status}</span>,
    },
    { key: 'manager', label: 'Manager', className: 'hidden xl:table-cell' },
  ];

  const filterConfigs = [
    { label: 'All Countries', options: ['USA', 'India', 'Germany', 'UK', 'Switzerland', 'Japan'], value: filters.country, onChange: (v: string) => setFilters((f) => ({ ...f, country: v })) },
    { label: 'All Status', options: ['Active', 'Inactive', 'Lead'], value: filters.status, onChange: (v: string) => setFilters((f) => ({ ...f, status: v })) },
    { label: 'All Industries', options: ['Pharma', 'Biotech', 'Medical Devices'], value: filters.industry, onChange: (v: string) => setFilters((f) => ({ ...f, industry: v })) },
    { label: 'All Managers', options: [...new Set(customers.map((c) => c.manager))], value: filters.manager, onChange: (v: string) => setFilters((f) => ({ ...f, manager: v })) },
  ];

  const detail = selected ? detailRecord[selected.id] : null;

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">
      <PageHeader
        title="Customers"
        subtitle="Manage your customer relationships and track engagement"
        actions={
          <button className="btn-primary text-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
        }
      />

      <KPIGrid cards={kpiCards} />

      {/* Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ChartCard title="By Country" icon={<Globe className="w-5 h-5 text-primary-400" />} className="lg:col-span-1">
          <div className="chart-height-sm">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={countryData} dataKey="value" nameKey="country" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3}>
                  {countryData.map((_, i) => <Cell key={i} fill={countryColors[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {countryData.slice(0, 6).map((c, i) => (
              <div key={c.country} className="flex items-center gap-1.5 text-xs text-surface-400">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: countryColors[i] }} />
                {c.country} <span className="text-surface-500">({c.value})</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Revenue by Customer" icon={<DollarSign className="w-5 h-5 text-primary-400" />} className="lg:col-span-1">
          <div className="chart-height-sm">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByCustomer} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={75} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="rev" radius={[0, 4, 4, 0]} fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Customer Growth" icon={<TrendingUp className="w-5 h-5 text-primary-400" />} className="lg:col-span-1">
          <div className="chart-height-sm">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <defs><linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs>
                <Area type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2.5} fill="url(#cg2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Retention Rate" icon={<Target className="w-5 h-5 text-primary-400" />} className="lg:col-span-1">
          <div className="chart-height-sm">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[85, 100]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="retained" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: '#8b5cf6', strokeWidth: 0, r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Filters + Table */}
      <FilterBar filters={filterConfigs} />
      {filtered.length === 0 ? (
        <EmptyState icon={Users} title="No customers match your filters" description="Try adjusting the filter criteria to see more results." />
      ) : (
        <DataTable
          columns={columns}
          rows={filtered}
          keyExtractor={(r) => r.id}
          onRowClick={(r) => setSelected(r)}
          pageSize={10}
        />
      )}

      {/* Customer Detail Panel */}
      {selected && detail && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-lg bg-surface-900 border-l border-surface-800 overflow-y-auto animate-slide-in-right">
            <div className="sticky top-0 bg-surface-900 border-b border-surface-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-600/10 flex items-center justify-center text-sm font-bold text-primary-400">{detail.logo}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{detail.company}</h3>
                  <p className="text-xs text-surface-500">{detail.industry} · {detail.country}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="btn-ghost p-2"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-4 space-y-5">
              {/* Quick Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Revenue', value: detail.totalRevenue, icon: DollarSign },
                  { label: 'Manager', value: detail.manager, icon: Users },
                  { label: 'Email', value: detail.email, icon: Mail },
                  { label: 'Phone', value: detail.phone, icon: Phone },
                  { label: 'Since', value: detail.since, icon: Calendar },
                  { label: 'Products', value: detail.products, icon: ShoppingBag },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-2.5 p-3 bg-surface-800/50 rounded-xl">
                    <Icon className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] text-surface-500 uppercase tracking-wider">{label}</p>
                      <p className="text-sm text-surface-200 truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* About */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">About</h4>
                <p className="text-sm text-surface-400 leading-relaxed">{detail.about}</p>
              </div>

              {/* AI Insights */}
              <div className="p-4 bg-primary-500/5 border border-primary-500/10 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-primary-400" />
                  <span className="text-sm font-medium text-white">AI Insights</span>
                </div>
                <ul className="space-y-2">
                  <li className="text-sm text-surface-400 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    Duloxetine demand expected to rise 15% next quarter — consider early renewal.
                  </li>
                  <li className="text-sm text-surface-400 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    Payment terms expiring in 14 days — send reminder.
                  </li>
                  <li className="text-sm text-surface-400 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    Competitor pricing detected 6% lower — review strategy.
                  </li>
                </ul>
              </div>

              {/* Activity Timeline */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Recent Activity</h4>
                <div className="space-y-1">
                  {detail.activities.map((a, i) => {
                    const Icon = a.type === 'email' ? Mail : a.type === 'meeting' ? Calendar : a.type === 'document' ? FileText : a.type === 'insight' ? Bot : Activity;
                    return (
                      <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-surface-800 transition-colors">
                        <div className="w-7 h-7 rounded-lg bg-surface-800 flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5 text-surface-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-surface-200">{a.text}</p>
                        </div>
                        <span className="text-xs text-surface-600 shrink-0">{a.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
