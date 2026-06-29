import type { ReactNode } from 'react';

interface Props {
  title: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function ChartCard({ title, icon, action, children, className = '' }: Props) {
  return (
    <div className={`card ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-base font-semibold text-white">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
