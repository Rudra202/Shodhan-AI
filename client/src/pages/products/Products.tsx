import { useState } from 'react';
import { Package, TrendingUp, AlertTriangle, DollarSign, BarChart3, Globe, ShoppingCart, Award, Download, FileText, CheckCircle, X } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import PageHeader from '../../components/ui/PageHeader';
import KPIGrid from '../../components/ui/KPIGrid';
import ChartCard from '../../components/ui/ChartCard';
import type { KPICardData } from '../../components/ui/KPICard';

const kpiCards: KPICardData[] = [
  { label: 'Total Products', value: '48', change: '+6', trend: 'up', icon: Package, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
  { label: 'Best Seller', value: 'Duloxetine', change: '₹2.1 Cr', trend: 'up', icon: TrendingUp, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
  { label: 'Low Stock', value: '3', change: '+2', trend: 'up', icon: AlertTriangle, iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
  { label: 'Product Revenue', value: '₹18.6 Cr', change: '+14.2%', trend: 'up', icon: DollarSign, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
];

const products = [
  { id: '1', name: 'Duloxetine HCl', category: 'API', status: 'Active', sales: '₹2.1 Cr', stock: 'High', countries: '12', mfr: 'Sun Pharma', cert: 'FDA, WHO-GMP', image: 'DL' },
  { id: '2', name: 'Ibuprofen BP', category: 'API', status: 'Active', sales: '₹1.8 Cr', stock: 'High', countries: '8', mfr: 'Aarti Drugs', cert: 'FDA', image: 'IB' },
  { id: '3', name: 'Paracetamol USP', category: 'API', status: 'Active', sales: '₹1.5 Cr', stock: 'Medium', countries: '10', mfr: 'Cipla', cert: 'WHO-GMP', image: 'PR' },
  { id: '4', name: 'Amoxicillin Trihydrate', category: 'API', status: 'Active', sales: '₹1.2 Cr', stock: 'Low', countries: '6', mfr: 'Novartis', cert: 'FDA, EU-GMP', image: 'AM' },
  { id: '5', name: 'Omeprazole', category: 'Intermediate', status: 'Active', sales: '₹0.9 Cr', stock: 'Medium', countries: '5', mfr: 'Zydus', cert: 'WHO-GMP', image: 'OM' },
  { id: '6', name: 'Azithromycin', category: 'API', status: 'Inactive', sales: '₹0.6 Cr', stock: 'Low', countries: '4', mfr: 'Torrent', cert: 'FDA', image: 'AZ' },
];

const salesTrend = [
  { month: 'Jan', sales: 12 }, { month: 'Feb', sales: 15 }, { month: 'Mar', sales: 13 },
  { month: 'Apr', sales: 17 }, { month: 'May', sales: 19 }, { month: 'Jun', sales: 22 },
];
const topProducts = [
  { name: 'Duloxetine', sales: 92 }, { name: 'Ibuprofen', sales: 75 },
  { name: 'Paracetamol', sales: 58 }, { name: 'Amoxicillin', sales: 44 },
  { name: 'Omeprazole', sales: 31 },
];
const countryDemand = [
  { country: 'India', value: 35 }, { country: 'USA', value: 25 },
  { country: 'Germany', value: 18 }, { country: 'Japan', value: 12 }, { country: 'UK', value: 10 },
];
const productRevenue = [
  { name: 'Duloxetine', rev: 2.1 }, { name: 'Ibuprofen', rev: 1.8 },
  { name: 'Paracetamol', rev: 1.5 }, { name: 'Amoxicillin', rev: 1.2 },
  { name: 'Omeprazole', rev: 0.9 },
];
const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const CustomTooltip = ({ active, payload, label }: any) => (
  active && payload?.length
    ? <div className="bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 shadow-lg"><p className="text-xs text-surface-400">{label || payload[0].name}</p><p className="text-sm font-semibold text-white">{payload[0].value}{payload[0].name === 'rev' ? ' Cr' : ''}</p></div>
    : null
);

export default function Products() {
  const [selected, setSelected] = useState<string | null>(null);
  const detail = products.find((p) => p.id === selected);

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">
      <PageHeader title="Products" subtitle="Manage your product catalog, track inventory and sales" actions={<button className="btn-primary text-sm flex items-center gap-2"><Download className="w-4 h-4" /> Export</button>} />
      <KPIGrid cards={kpiCards} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ChartCard title="Sales Trend" icon={<TrendingUp className="w-5 h-5 text-primary-400" />} className="lg:col-span-1">
          <div className="chart-height-sm"><ResponsiveContainer width="100%" height="100%"><LineChart data={salesTrend}><CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" /><XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip content={<CustomTooltip />} /><Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }} /></LineChart></ResponsiveContainer></div>
        </ChartCard>
        <ChartCard title="Top Products" icon={<BarChart3 className="w-5 h-5 text-primary-400" />} className="lg:col-span-1">
          <div className="chart-height-sm"><ResponsiveContainer width="100%" height="100%"><BarChart data={topProducts} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" horizontal={false} /><XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={75} /><Tooltip content={<CustomTooltip />} /><Bar dataKey="sales" radius={[0, 4, 4, 0]}>{topProducts.map((_, i) => <Cell key={i} fill={colors[i]} />)}</Bar></BarChart></ResponsiveContainer></div>
        </ChartCard>
        <ChartCard title="Country Demand" icon={<Globe className="w-5 h-5 text-primary-400" />} className="lg:col-span-1">
          <div className="chart-height-sm"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={countryDemand} dataKey="value" nameKey="country" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3}>{countryDemand.map((_, i) => <Cell key={i} fill={colors[i]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
        </ChartCard>
        <ChartCard title="Product Revenue (Cr)" icon={<DollarSign className="w-5 h-5 text-primary-400" />} className="lg:col-span-1">
          <div className="space-y-3 mt-2">{productRevenue.map((p, i) => <div key={p.name}><div className="flex items-center justify-between text-sm mb-1"><span className="text-surface-300">{p.name}</span><span className="text-surface-400 font-medium">₹{p.rev}</span></div><div className="w-full h-2 bg-surface-800 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${(p.rev / 2.1) * 100}%`, backgroundColor: colors[i] }} /></div></div>)}</div>
        </ChartCard>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{products.map((p) => (
        <div key={p.id} className={`card-hover cursor-pointer ${selected === p.id ? 'ring-2 ring-primary-500' : ''}`} onClick={() => setSelected(selected === p.id ? null : p.id)}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary-600/10 flex items-center justify-center text-sm font-bold text-primary-400">{p.image}</div>
            <div><h3 className="font-semibold text-white">{p.name}</h3><p className="text-xs text-surface-500">{p.category}</p></div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="text-surface-500">Sales</span><p className="text-white font-medium">{p.sales}</p></div>
            <div><span className="text-surface-500">Stock</span><p className={`font-medium ${p.stock === 'Low' ? 'text-red-400' : p.stock === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`}>{p.stock}</p></div>
            <div><span className="text-surface-500">Countries</span><p className="text-white">{p.countries}</p></div>
            <div><span className="text-surface-500">Status</span><span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>{p.status}</span></div>
          </div>
        </div>
      ))}</div>
      {detail && (
        <div className="card">
          <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-white">{detail.name} Details</h3><button onClick={() => setSelected(null)} className="btn-ghost p-1"><X className="w-4 h-4" /></button></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              {[{ label: 'Manufacturer', value: detail.mfr }, { label: 'Category', value: detail.category }, { label: 'Certifications', value: detail.cert }, { label: 'Export Countries', value: detail.countries }, { label: 'Stock Level', value: detail.stock }, { label: 'Sales', value: detail.sales }].map((f) => (<div key={f.label} className="flex justify-between p-3 bg-surface-800/50 rounded-xl"><span className="text-sm text-surface-400">{f.label}</span><span className="text-sm text-white font-medium">{f.value}</span></div>))}
            </div>
            <div className="p-4 bg-primary-500/5 border border-primary-500/10 rounded-xl"><div className="flex items-center gap-2 mb-3"><TrendingUp className="w-4 h-4 text-primary-400" /><span className="text-sm font-medium text-white">AI Insights</span></div><ul className="space-y-2">{['Demand expected to grow 15% next quarter', 'Competitor pricing dropped 6% — consider adjustment', 'New market opportunity in Brazil identified', 'Certificate renewal due in 45 days'].map((t) => (<li key={t} className="text-sm text-surface-400 flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-primary-400 mt-0.5 shrink-0" />{t}</li>))}</ul></div>
          </div>
        </div>
      )}
    </div>
  );
}
