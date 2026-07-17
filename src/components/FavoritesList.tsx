import { useState } from 'react';
import { usePokemonContext } from '../context/PokemonContext';
import { TYPE_COLORS } from '../types/pokemon';

export function FavoritesList() {
  const { favorites, removeFavorite, clearFavorites } = usePokemonContext();
  const [filterText, setFilterText] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredFavorites = filterText
    ? favorites.filter(f =>
        f.name.toLowerCase().includes(filterText.toLowerCase())
      )
    : favorites;

  if (favorites.length === 0) {
    return (
      <div className="favorites-section">
        <div className="favorites-header" onClick={() => setShowFavorites(!showFavorites)}>
          <span className="favorites-title">⭐ Favoritos</span>
          <span className="favorites-count">0</span>
        </div>
        <p className="favorites-empty">
          No tienes Pokémon favoritos aún.
          Busca un Pokémon y haz clic en 🤍 para agregarlo.
        </p>
      </div>
    );
  }

  return (
    <div className="favorites-section">
      <div className="favorites-header" onClick={() => setShowFavorites(!showFavorites)}>
        <span className="favorites-title">⭐ Favoritos</span>
        <span className="favorites-count">{favorites.length}</span>
        <button
          className="favorites-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setShowFavorites(!showFavorites);
          }}
        >
          {showFavorites ? '▲' : '▼'}
        </button>
      </div>

      {showFavorites && (
        <div className="favorites-content">
          <div className="favorites-toolbar">
            <div className="favorites-search-wrapper">
              <input
                type="text"
                className="favorites-search"
                placeholder="Filtrar favoritos..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
            <button
              className="clear-favorites-btn"
              onClick={clearFavorites}
            >
              🗑️ Limpiar favoritos
            </button>
          </div>

          <div className="favorites-grid">
            {filteredFavorites.map(pokemon => {
              const mainType = 'normal';
              const typeColor = TYPE_COLORS[mainType] || '#777';

              return (
                <div key={pokemon.id} className="favorite-card" style={{ '--card-color': typeColor } as React.CSSProperties}>
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="favorite-image"
                  />
                  <div className="favorite-info">
                    <span className="favorite-name">
                      {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </span>
                    <span className="favorite-id">#{String(pokemon.id).padStart(3, '0')}</span>
                  </div>
                  <button
                    className="favorite-remove-btn"
                    onClick={() => removeFavorite(pokemon.id)}
                    title="Quitar de favoritos"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          {filteredFavorites.length === 0 && (
            <p className="favorites-filter-empty">
              No hay favoritos que coincidan con "{filterText}"
            </p>
          )}
        </div>
      )}
    </div>
  );
}
