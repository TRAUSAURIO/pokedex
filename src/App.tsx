import { useState } from 'react';
import type { PokemonDetail } from './types/pokemon';
import { PokemonProvider } from './context/PokemonContext';
import { usePokemonList } from './hooks/usePokemonList';
import { usePokemonDetail } from './hooks/usePokemonDetail';
import { SearchBar } from './components/SearchBar';
import { TypeFilter } from './components/TypeFilter';
import { PokemonGrid } from './components/PokemonGrid';
import { Pagination } from './components/Pagination';
import { PokemonDetailModal } from './components/PokemonDetail';
import { PokemonSearch } from './components/PokemonSearch';
import { FavoritesList } from './components/FavoritesList';
import './App.css';

function AppContent() {
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<'grid' | 'search'>('grid');

  const {
    pokemon,
    loading,
    error,
    totalCount,
    page,
    setPage,
    search,
    setSearch,
    selectedType,
    setSelectedType,
  } = usePokemonList();

  const { pokemon: detailPokemon, species } = usePokemonDetail(selectedPokemonId);

  const handlePokemonClick = (p: PokemonDetail) => {
    setSelectedPokemonId(p.id);
  };

  const handleCloseModal = () => {
    setSelectedPokemonId(null);
  };

  const handleNavigatePokemon = (id: number) => {
    setSelectedPokemonId(id);
  };

  return (
    <div className="app">
      {/* Background effects */}
      <div className="bg-circle bg-circle-1"></div>
      <div className="bg-circle bg-circle-2"></div>
      <div className="bg-circle bg-circle-3"></div>

      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-logo">
            <div className="pokeball-icon">
              <div className="pokeball-icon-top"></div>
              <div className="pokeball-icon-line"></div>
              <div className="pokeball-icon-circle"></div>
            </div>
            <div className="header-title-section">
              <h1 className="header-title">Pokédex</h1>
              <p className="header-subtitle">Explora el mundo Pokémon</p>
            </div>
          </div>

          {/* Navegación entre vistas */}
          <nav className="header-nav">
            <button
              className={`nav-btn ${activeView === 'grid' ? 'active' : ''}`}
              onClick={() => setActiveView('grid')}
            >
              🗂️ Explorar
            </button>
            <button
              className={`nav-btn ${activeView === 'search' ? 'active' : ''}`}
              onClick={() => setActiveView('search')}
            >
              🔍 Buscar
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Sidebar: Favorites */}
        <aside className="sidebar">
          <FavoritesList />
        </aside>

        {/* Main area */}
        <div className="content-area">
          {activeView === 'grid' ? (
            <>
              <div className="controls-section">
                <SearchBar
                  value={search}
                  onChange={(v) => {
                    setSearch(v);
                    setPage(1);
                  }}
                />
                <TypeFilter
                  selectedType={selectedType}
                  onTypeChange={(t) => {
                    setSelectedType(t);
                    setPage(1);
                  }}
                />
              </div>

              <PokemonGrid
                pokemon={pokemon}
                loading={loading}
                error={error}
                onPokemonClick={handlePokemonClick}
              />

              <Pagination
                page={page}
                totalCount={totalCount}
                onPageChange={setPage}
              />
            </>
          ) : (
            <PokemonSearch />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Pokédex App &copy; 2025 &mdash; Datos de <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer">PokéAPI</a></p>
      </footer>

      {/* Detail Modal */}
      {selectedPokemonId && (
        <PokemonDetailModal
          pokemon={detailPokemon}
          species={species}
          onClose={handleCloseModal}
          onNavigate={handleNavigatePokemon}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <PokemonProvider>
      <AppContent />
    </PokemonProvider>
  );
}

export default App;
