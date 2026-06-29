import KPICard, { type KPICardData } from './KPICard';

interface Props {
  cards: KPICardData[];
  columns?: number;
}

export default function KPIGrid({ cards }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <KPICard key={card.label} card={card} />
      ))}
    </div>
  );
}
