import type { PokemonDetail } from '../types/pokemon';
import { TYPE_COLORS } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonDetail;
  onClick: (pokemon: PokemonDetail) => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const idStr = String(pokemon.id).padStart(3, '0');
  const mainType = pokemon.types[0]?.type.name || 'normal';
  const typeColor = TYPE_COLORS[mainType] || '#777';
  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default
    || pokemon.sprites.front_default;

  return (
    <div
      className="pokemon-card"
      style={{ '--card-color': typeColor } as React.CSSProperties}
      onClick={() => onClick(pokemon)}
    >
      <div className="card-number">#{idStr}</div>
      <div className="card-image-container">
        <img
          src={imageUrl}
          alt={pokemon.name}
          className="card-image"
          loading="lazy"
        />
      </div>
      <div className="card-info">
        <h3 className="card-name">{formattedName}</h3>
        <div className="card-types">
          {pokemon.types.map(t => (
            <span
              key={t.type.name}
              className="type-badge"
              style={{ backgroundColor: TYPE_COLORS[t.type.name] || '#777' }}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
      <div className="card-glow"></div>
    </div>
  );
}
