export interface Filter {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

interface Props {
  filters: Filter[];
}

export default function FilterBar({ filters }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {filters.map((f) => (
        <select
          key={f.label}
          value={f.value}
          onChange={(e) => f.onChange(e.target.value)}
          className="text-xs bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-surface-400 focus:outline-none focus:ring-1 focus:ring-primary-500/50"
        >
          <option value="">{f.label}</option>
          {f.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ))}
    </div>
  );
}
