import type { LucideIcon } from 'lucide-react';
import { Activity } from 'lucide-react';

export interface ActivityItem {
  icon: LucideIcon;
  text: string;
  time: string;
}

interface Props {
  items: ActivityItem[];
  title?: string;
  icon?: LucideIcon;
}

export default function ActivityFeed({ items, title, icon: TitleIcon }: Props) {
  return (
    <div className="card">
      {title && (
        <div className="flex items-center gap-2 mb-4">
          {TitleIcon ? <TitleIcon className="w-5 h-5 text-primary-400" /> : <Activity className="w-5 h-5 text-primary-400" />}
          <h2 className="text-base font-semibold text-white">{title}</h2>
        </div>
      )}
      <div className="space-y-1">
        {items.map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-surface-800 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-surface-800 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-surface-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-surface-200">{a.text}</p>
              </div>
              <span className="text-xs text-surface-600 whitespace-nowrap shrink-0">{a.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
