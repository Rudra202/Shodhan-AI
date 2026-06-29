import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Crosshair, DollarSign, Globe, Users, Star, Bot, BarChart3, ExternalLink, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import PageHeader from '../../components/ui/PageHeader';
import KPIGrid from '../../components/ui/KPIGrid';
import ChartCard from '../../components/ui/ChartCard';
import type { KPICardData } from '../../components/ui/KPICard';

const kpiCards: KPICardData[] = [
  { label: 'Total Competitors', value: '8', change: '+1', trend: 'up', icon: Crosshair, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
  { label: 'Market Position', value: '#3', change: '+1', trend: 'up', icon: TrendingUp, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
  { label: 'Market Share', value: '14.2%', change: '+2.1%', trend: 'up', icon: Globe, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
  { label: 'AI Features Gap', value: '4', change: '-1', trend: 'down', icon: Bot, iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
];

interface Competitor {
  id: string;
  name: string;
  logo: string;
  industry: string;
  marketShare: number;
  revenue: string;
  growth: string;
  trend: 'up' | 'down' | 'stable';
  strengths: string[];
  weaknesses: string[];
  aiScore: number;
  threat: 'low' | 'medium' | 'high';
}

const competitors: Competitor[] = [
  { id: '1', name: 'PharmaTech Solutions', logo: 'PT', industry: 'Pharmaceuticals', marketShare: 22.5, revenue: '₹45 Cr', growth: '+12%', trend: 'up', strengths: ['Strong R&D pipeline', 'Established brand', 'Pan-India distribution'], weaknesses: ['Legacy tech stack', 'Slow AI adoption', 'High pricing'], aiScore: 6, threat: 'high' },
  { id: '2', name: 'MediData Analytics', logo: 'MA', industry: 'Healthcare Analytics', marketShare: 18.3, revenue: '₹32 Cr', growth: '+8%', trend: 'up', strengths: ['Advanced analytics', 'Data partnerships', 'Talent pool'], weaknesses: ['Narrow focus', 'Limited product range', 'Regulatory gaps'], aiScore: 8, threat: 'high' },
  { id: '3', name: 'Global Health AI', logo: 'GH', industry: 'AI/Healthcare', marketShare: 12.1, revenue: '₹22 Cr', growth: '+24%', trend: 'up', strengths: ['Cutting-edge AI', 'Global reach', 'Strong patents'], weaknesses: ['Localization gaps', 'Premium pricing', 'Support limitations'], aiScore: 9, threat: 'medium' },
  { id: '4', name: 'BioTrack Systems', logo: 'BS', industry: 'Life Sciences', marketShare: 8.7, revenue: '₹15 Cr', growth: '-2%', trend: 'down', strengths: ['Regulatory expertise', 'Quality compliance', 'Longevity'], weaknesses: ['Outdated UI', 'No AI features', 'Slow innovation'], aiScore: 3, threat: 'low' },
  { id: '5', name: 'NextGen Pharma', logo: 'NP', industry: 'Pharmaceuticals', marketShare: 6.4, revenue: '₹11 Cr', growth: '+5%', trend: 'up', strengths: ['Innovation culture', 'Agile team', 'Modern stack'], weaknesses: ['Small scale', 'Limited capital', 'Narrow market'], aiScore: 7, threat: 'medium' },
  { id: '6', name: 'CareCloud AI', logo: 'CC', industry: 'Cloud Healthcare', marketShare: 5.2, revenue: '₹9 Cr', growth: '+18%', trend: 'up', strengths: ['Cloud-native', 'Scalable infra', 'API-first'], weaknesses: ['Security concerns', 'Compliance gaps', 'New entrant'], aiScore: 8, threat: 'medium' },
];

const marketShareData = competitors.map((c) => ({ name: c.name.split(' ')[0], share: c.marketShare }));
const aiScoreData = competitors.map((c) => ({ name: c.name.split(' ')[0], score: c.aiScore }));
const radarData = [
  { category: 'AI Capabilities', us: 85, competitor: 72 },
  { category: 'Market Presence', us: 70, competitor: 78 },
  { category: 'Product Breadth', us: 75, competitor: 65 },
  { category: 'Innovation', us: 90, competitor: 70 },
  { category: 'Customer Satisfaction', us: 88, competitor: 75 },
  { category: 'Pricing', us: 65, competitor: 55 },
];

const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

const CustomTooltip = ({ active, payload, label }: any) => active && payload?.length
  ? <div className="bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 shadow-lg"><p className="text-xs text-surface-400">{label || payload[0].name}</p>{payload.map((p: any, i: number) => <p key={i} className="text-sm font-semibold text-white">{p.name}: {p.value}{p.name === 'share' ? '%' : ''}</p>)}</div>
  : null;

const threatColors = { low: 'text-emerald-400 bg-emerald-500/10', medium: 'text-amber-400 bg-amber-500/10', high: 'text-red-400 bg-red-500/10' };
const trendIcons = { up: TrendingUp, down: TrendingDown, stable: Minus };
const trendColors = { up: 'text-emerald-400', down: 'text-red-400', stable: 'text-surface-400' };

export default function Competitors() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">
      <PageHeader title="Competitors" subtitle="AI-powered competitive analysis and market intelligence" actions={<button className="btn-primary text-sm flex items-center gap-2"><Bot className="w-4 h-4" /> Run AI Analysis</button>} />
      <KPIGrid cards={kpiCards} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Market Share" icon={<Globe className="w-5 h-5 text-primary-400" />}><div className="chart-height"><ResponsiveContainer width="100%" height="100%"><BarChart data={marketShareData}><CartesianGrid strokeDasharray="3 3" stroke="rgb(51 65 85)" /><XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} unit="%" /><Tooltip content={<CustomTooltip />} /><Bar dataKey="share" radius={[4, 4, 0, 0]}>{marketShareData.map((_, i) => <Cell key={i} fill={colors[i]} />)}</Bar></BarChart></ResponsiveContainer></div></ChartCard>
        <ChartCard title="AI Capability Comparison" icon={<Bot className="w-5 h-5 text-primary-400" />}><div className="chart-height"><ResponsiveContainer width="100%" height="100%"><RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%"><PolarGrid stroke="rgb(51 65 85)" /><PolarAngleAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 10 }} /><PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} /><Tooltip /><Radar name="Shodhan AI" dataKey="us" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} /><Radar name="Competitor Avg" dataKey="competitor" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} strokeWidth={2} /></RadarChart></ResponsiveContainer></div></ChartCard>
      </div>

      {/* Competitors List */}
      <div className="space-y-3">
        {competitors.map((comp) => {
          const TrendIcon = trendIcons[comp.trend];
          const isExpanded = selected === comp.id;
          return (
            <div key={comp.id} className={`card cursor-pointer ${isExpanded ? 'ring-1 ring-primary-500' : ''}`} onClick={() => setSelected(isExpanded ? null : comp.id)}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-sm font-bold text-primary-400 shrink-0">{comp.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{comp.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${threatColors[comp.threat]}`}>{comp.threat} threat</span>
                  </div>
                  <p className="text-xs text-surface-500">{comp.industry}</p>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-sm">
                  <div className="text-right"><p className="text-surface-500 text-xs">Market Share</p><p className="text-white font-semibold">{comp.marketShare}%</p></div>
                  <div className="text-right"><p className="text-surface-500 text-xs">Revenue</p><p className="text-white font-semibold">{comp.revenue}</p></div>
                  <div className="text-right"><p className="text-surface-500 text-xs">Growth</p><p className={`font-semibold flex items-center gap-1 ${trendColors[comp.trend]}`}><TrendIcon className="w-3.5 h-3.5" />{comp.growth}</p></div>
                  <div className="text-right"><p className="text-surface-500 text-xs">AI Score</p><p className="text-white font-semibold">{comp.aiScore}/10</p></div>
                </div>
                <div className="sm:hidden grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs">
                  <div><span className="text-surface-500">Share: </span><span className="text-white font-medium">{comp.marketShare}%</span></div>
                  <div><span className="text-surface-500">Revenue: </span><span className="text-white font-medium">{comp.revenue}</span></div>
                  <div><span className="text-surface-500">Growth: </span><span className={`font-medium ${trendColors[comp.trend]}`}>{comp.growth}</span></div>
                  <div><span className="text-surface-500">AI: </span><span className="text-white font-medium">{comp.aiScore}/10</span></div>
                </div>
                <div className="flex items-center gap-1 text-xs bg-surface-800 rounded-lg px-2 py-1"><Bot className="w-3 h-3 text-primary-400" /><span className="text-surface-300">AI</span></div>
              </div>
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-surface-800 grid sm:grid-cols-2 gap-4">
                  <div><p className="text-xs font-medium text-surface-500 uppercase mb-2">Strengths</p><div className="space-y-1.5">{comp.strengths.map((s) => <div key={s} className="flex items-center gap-2 text-sm text-emerald-400"><TrendingUp className="w-3.5 h-3.5 shrink-0" />{s}</div>)}</div></div>
                  <div><p className="text-xs font-medium text-surface-500 uppercase mb-2">Weaknesses</p><div className="space-y-1.5">{comp.weaknesses.map((w) => <div key={w} className="flex items-center gap-2 text-sm text-red-400"><TrendingDown className="w-3.5 h-3.5 shrink-0" />{w}</div>)}</div></div>
                  <div className="sm:col-span-2 p-3 bg-primary-500/5 border border-primary-500/10 rounded-xl flex items-start gap-3"><Bot className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" /><div><p className="text-sm font-medium text-primary-400 mb-1">AI Insight</p><p className="text-sm text-surface-300">Shodhan AI leads in AI capabilities but trails in market share. Recommended focus: leverage AI features as differentiator in marketing campaigns. Competitor <strong>{comp.name}</strong> shows {comp.trend === 'up' ? 'strong growth in' : comp.trend === 'down' ? 'declining' : 'stable'} {comp.industry} sector.</p></div></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
