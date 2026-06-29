import type { LucideIcon } from 'lucide-react';
import { Lightbulb } from 'lucide-react';

export interface Suggestion {
  title: string;
  desc: string;
  icon?: LucideIcon;
}

interface Props {
  items: Suggestion[];
}

export default function AISuggestions({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {items.map((s) => {
        const Icon = s.icon || Lightbulb;
        return (
          <div key={s.title} className="card-hover cursor-pointer group">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                <Icon className="w-4 h-4 text-primary-400" />
              </div>
              <span className="text-sm font-medium text-white">{s.title}</span>
            </div>
            <p className="text-sm text-surface-400 leading-relaxed">{s.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
