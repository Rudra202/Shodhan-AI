import type { LucideIcon } from 'lucide-react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export interface KPICardData {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  onClick?: () => void;
}

interface Props {
  card: KPICardData;
}

export default function KPICard({ card }: Props) {
  return (
    <div
      className={`card-hover cursor-pointer group ${card.onClick ? '' : 'cursor-default'}`}
      onClick={card.onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-surface-400">{card.label}</span>
        <div className={`w-10 h-10 rounded-xl ${card.iconBg || 'bg-primary-600/10'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <card.icon className={`w-5 h-5 ${card.iconColor || 'text-primary-400'}`} />
        </div>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{card.value}</p>
      <div className={`flex items-center gap-1 text-sm ${card.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
        {card.trend === 'up' ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />}
        {card.change} vs last month
      </div>
    </div>
  );
}
