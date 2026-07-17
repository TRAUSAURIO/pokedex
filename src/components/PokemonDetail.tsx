import { useEffect, useState } from 'react';
import type { PokemonDetail, PokemonSpecies } from '../types/pokemon';
import { TYPE_COLORS } from '../types/pokemon';

interface PokemonDetailProps {
  pokemon: PokemonDetail | null;
  species: PokemonSpecies | null;
  onClose: () => void;
  onNavigate: (id: number) => void;
}

const STAT_MAX = 255;
const STAT_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. Esp.',
  'special-defense': 'Def. Esp.',
  speed: 'Velocidad',
};

function getFlavorText(species: PokemonSpecies | null): string {
  if (!species) return '';
  const entry = species.flavor_text_entries.find(e => e.language.name === 'es')
    || species.flavor_text_entries.find(e => e.language.name === 'en');
  if (!entry) return '';
  return entry.flavor_text.replace(/[\n\f]/g, ' ');
}

function getGenus(species: PokemonSpecies | null): string {
  if (!species) return '';
  const entry = species.genera.find(g => g.language.name === 'es')
    || species.genera.find(g => g.language.name === 'en');
  return entry?.genus || '';
}

export function PokemonDetailModal({ pokemon, species, onClose, onNavigate }: PokemonDetailProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'abilities' | 'evolution'>('stats');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && pokemon && pokemon.id > 1) onNavigate(pokemon.id - 1);
      if (e.key === 'ArrowRight' && pokemon && pokemon.id < 898) onNavigate(pokemon.id + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate, pokemon]);

  useEffect(() => {
    setImageLoaded(false);
    setActiveTab('stats');
  }, [pokemon?.id]);

  if (!pokemon) return null;

  const mainType = pokemon.types[0]?.type.name || 'normal';
  const typeColor = TYPE_COLORS[mainType] || '#777';
  const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const idStr = String(pokemon.id).padStart(3, '0');
  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default
    || pokemon.sprites.front_default;
  const weight = (pokemon.weight / 10).toFixed(1);
  const height = (pokemon.height / 10).toFixed(1);
  const flavorText = getFlavorText(species);
  const genus = getGenus(species);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-header" style={{ background: `linear-gradient(135deg, ${typeColor}44, ${typeColor}22)` }}>
          <div className="modal-nav">
            <button
              className="modal-nav-btn"
              onClick={() => pokemon.id > 1 && onNavigate(pokemon.id - 1)}
              disabled={pokemon.id <= 1}
            >
              ‹
            </button>
            <span className="modal-number">#{idStr}</span>
            <button
              className="modal-nav-btn"
              onClick={() => pokemon.id < 898 && onNavigate(pokemon.id + 1)}
              disabled={pokemon.id >= 898}
            >
              ›
            </button>
          </div>

          <div className="modal-image-section">
            {!imageLoaded && <div className="modal-image-placeholder" />}
            <img
              src={imageUrl}
              alt={pokemon.name}
              className={`modal-image ${imageLoaded ? 'loaded' : ''}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-types">
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

          <h2 className="modal-name">{formattedName}</h2>
          {genus && <p className="modal-genus">{genus}</p>}

          {flavorText && (
            <p className="modal-description">{flavorText}</p>
          )}

          <div className="modal-measurements">
            <div className="measurement">
              <span className="measurement-icon">📏</span>
              <span className="measurement-value">{height} m</span>
              <span className="measurement-label">Altura</span>
            </div>
            <div className="measurement">
              <span className="measurement-icon">⚖️</span>
              <span className="measurement-value">{weight} kg</span>
              <span className="measurement-label">Peso</span>
            </div>
          </div>

          <div className="modal-tabs">
            {(['stats', 'abilities', 'evolution'] as const).map(tab => (
              <button
                key={tab}
                className={`modal-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'stats' ? 'Estadísticas' : tab === 'abilities' ? 'Habilidades' : 'Evoluciones'}
              </button>
            ))}
          </div>

          <div className="modal-tab-content">
            {activeTab === 'stats' && (
              <div className="stats-container">
                {pokemon.stats.map(stat => {
                  const statName = stat.stat.name;
                  const percentage = (stat.base_stat / STAT_MAX) * 100;
                  return (
                    <div key={statName} className="stat-row">
                      <span className="stat-label">{STAT_NAMES[statName] || statName}</span>
                      <span className="stat-value">{stat.base_stat}</span>
                      <div className="stat-bar-bg">
                        <div
                          className="stat-bar-fill"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: stat.base_stat > 100 ? '#4CAF50'
                              : stat.base_stat > 70 ? '#FFC107'
                              : stat.base_stat > 40 ? '#FF9800'
                              : '#f44336'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
                <div className="stat-total">
                  <span className="stat-total-label">Total</span>
                  <span className="stat-total-value">
                    {pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0)}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'abilities' && (
              <div className="abilities-container">
                {pokemon.abilities.map(a => (
                  <div key={a.ability.name} className="ability-card">
                    <div className="ability-header">
                      <span className="ability-name">
                        {a.ability.name.replace('-', ' ')}
                      </span>
                      {a.is_hidden && (
                        <span className="ability-hidden">Oculta</span>
                      )}
                    </div>
                    <p className="ability-description">
                      {a.is_hidden ? 'Habilidad oculta' : `Habilidad #${a.slot}`}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'evolution' && (
              <div className="evolution-container">
                <p className="evolution-placeholder">
                  Información de evolución próximamente
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
