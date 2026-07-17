import type { PokemonDetail } from '../types/pokemon';
import { PokemonCard } from './PokemonCard';
import { LoadingSpinner } from './LoadingSpinner';

interface PokemonGridProps {
  pokemon: PokemonDetail[];
  loading: boolean;
  error: string | null;
  onPokemonClick: (pokemon: PokemonDetail) => void;
}

export function PokemonGrid({ pokemon, loading, error, onPokemonClick }: PokemonGridProps) {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <p className="error-text">{error}</p>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="empty-container">
        <div className="empty-icon">🔍</div>
        <p className="empty-text">No se encontraron Pokémon</p>
        <p className="empty-hint">Intenta con otro término de búsqueda</p>
      </div>
    );
  }

  return (
    <div className="pokemon-grid">
      {pokemon.map(p => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          onClick={onPokemonClick}
        />
      ))}
    </div>
  );
}
