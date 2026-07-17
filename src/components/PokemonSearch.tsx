import { useState } from 'react';
import { getPokemonByName, getPokemonById } from '../services/pokemonService';
import type { PokemonDetail } from '../types/pokemon';
import { TYPE_COLORS } from '../types/pokemon';
import { usePokemonContext } from '../context/PokemonContext';

export function PokemonSearch() {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const { addFavorite, removeFavorite, isFavorite } = usePokemonContext();

  const handleSearch = async () => {
    const trimmed = searchText.trim();
    if (!trimmed) {
      setError('Por favor ingresa un nombre de Pokémon');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getPokemonByName(trimmed);
      setPokemon(data);

      // Agregar al historial (máximo 5)
      setSearchHistory(prev => {
        const updated = [data.name, ...prev.filter(n => n !== data.name)];
        return updated.slice(0, 5);
      });
    } catch (err) {
      setError(`No se encontró el Pokémon "${trimmed}". Verifica el nombre e intenta de nuevo.`);
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = async () => {
    setLoading(true);
    setError(null);
    setSearchText('');

    try {
      const randomId = Math.floor(Math.random() * 150) + 1;
      const data = await getPokemonById(randomId);
      setPokemon(data);

      setSearchHistory(prev => {
        const updated = [data.name, ...prev.filter(n => n !== data.name)];
        return updated.slice(0, 5);
      });
    } catch (err) {
      setError('Error al obtener un Pokémon aleatorio');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleHistoryClick = (name: string) => {
    setSearchText(name);
    // Auto-buscar al hacer clic en el historial
    const doSearch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPokemonByName(name);
        setPokemon(data);
      } catch (err) {
        setError(`No se encontró el Pokémon "${name}"`);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };
    doSearch();
  };

  const toggleFavorite = () => {
    if (!pokemon) return;
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default,
      });
    }
  };

  const formattedName = pokemon?.name.charAt(0).toUpperCase() + (pokemon?.name.slice(1) || '');
  const idStr = pokemon ? String(pokemon.id).padStart(3, '0') : '';
  const mainType = pokemon?.types[0]?.type.name || 'normal';
  const typeColor = TYPE_COLORS[mainType] || '#777';
  const imageUrl = pokemon?.sprites.other?.['official-artwork']?.front_default
    || pokemon?.sprites.front_default || '';
  const weight = pokemon ? (pokemon.weight / 10).toFixed(1) : '';
  const height = pokemon ? (pokemon.height / 10).toFixed(1) : '';

  return (
    <div className="pokemon-search">
      <div className="search-section">
        <div className="search-input-group">
          <input
            type="text"
            className="search-field"
            placeholder="Buscar Pokémon por nombre..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="search-button"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? '...' : '🔍'}
          </button>
          <button
            className="random-button"
            onClick={handleRandom}
            disabled={loading}
            title="Pokémon aleatorio"
          >
            🎲
          </button>
        </div>

        {error && (
          <div className="search-error">
            <span className="search-error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {searchHistory.length > 0 && (
          <div className="search-history">
            <span className="history-label">Últimas búsquedas:</span>
            <div className="history-tags">
              {searchHistory.map(name => (
                <button
                  key={name}
                  className="history-tag"
                  onClick={() => handleHistoryClick(name)}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className="search-loading">
          <div className="mini-loader"></div>
          <span>Buscando Pokémon...</span>
        </div>
      )}

      {pokemon && !loading && (
        <div className="search-result-card" style={{ borderColor: typeColor }}>
          <div className="result-header" style={{ background: `linear-gradient(135deg, ${typeColor}33, transparent)` }}>
            <div className="result-id">#{idStr}</div>
            <button
              className={`favorite-btn ${isFavorite(pokemon.id) ? 'active' : ''}`}
              onClick={toggleFavorite}
              title={isFavorite(pokemon.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              {isFavorite(pokemon.id) ? '❤️' : '🤍'}
            </button>
          </div>

          <div className="result-image-container">
            <img
              src={imageUrl}
              alt={pokemon.name}
              className="result-image"
            />
          </div>

          <div className="result-info">
            <h3 className="result-name">{formattedName}</h3>

            <div className="result-types">
              {pokemon.types.map(t => (
                <span
                  key={t.type.name}
                  className="type-badge"
                  style={{ backgroundColor: TYPE_COLORS[t.type.name] }}
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            <div className="result-details">
              <div className="result-detail">
                <span className="detail-label">Altura</span>
                <span className="detail-value">{height} m</span>
              </div>
              <div className="result-detail">
                <span className="detail-label">Peso</span>
                <span className="detail-value">{weight} kg</span>
              </div>
              <div className="result-detail">
                <span className="detail-label">Exp. base</span>
                <span className="detail-value">{pokemon.base_experience}</span>
              </div>
            </div>

            <div className="result-abilities">
              <span className="abilities-label">Habilidades:</span>
              <div className="abilities-list">
                {pokemon.abilities.map(a => (
                  <span key={a.ability.name} className="ability-tag">
                    {a.ability.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
