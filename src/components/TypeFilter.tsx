import { POKEMON_TYPES, TYPE_COLORS } from '../types/pokemon';

interface TypeFilterProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const TYPE_ICONS: Record<string, string> = {
  normal: '⬜',
  fire: '🔥',
  water: '💧',
  electric: '⚡',
  grass: '🌿',
  ice: '❄️',
  fighting: '👊',
  poison: '☠️',
  ground: '🏔️',
  flying: '🕊️',
  psychic: '🔮',
  bug: '🐛',
  rock: '🪨',
  ghost: '👻',
  dragon: '🐉',
  dark: '🌙',
  steel: '⚙️',
  fairy: '🧚',
};

export function TypeFilter({ selectedType, onTypeChange }: TypeFilterProps) {
  return (
    <div className="type-filter">
      <button
        className={`type-filter-btn ${!selectedType ? 'active' : ''}`}
        onClick={() => onTypeChange('')}
      >
        <span className="type-filter-icon">⭐</span>
        <span className="type-filter-label">Todos</span>
      </button>
      {POKEMON_TYPES.map(type => (
        <button
          key={type}
          className={`type-filter-btn ${selectedType === type ? 'active' : ''}`}
          style={{ '--type-color': TYPE_COLORS[type] } as React.CSSProperties}
          onClick={() => onTypeChange(selectedType === type ? '' : type)}
        >
          <span className="type-filter-icon">{TYPE_ICONS[type]}</span>
          <span className="type-filter-label">{type}</span>
        </button>
      ))}
    </div>
  );
}
