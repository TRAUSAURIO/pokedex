import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { PokemonFavorite } from '../types/pokemon';

interface PokemonContextType {
  favorites: PokemonFavorite[];
  addFavorite: (pokemon: PokemonFavorite) => void;
  removeFavorite: (id: number) => void;
  clearFavorites: () => void;
  isFavorite: (id: number) => boolean;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

const FAVORITES_KEY = 'pokedex-favorites';

function loadFavorites(): PokemonFavorite[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading favorites from localStorage:', e);
  }
  return [];
}

function saveFavorites(favorites: PokemonFavorite[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error('Error saving favorites to localStorage:', e);
  }
}

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<PokemonFavorite[]>(loadFavorites);

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const addFavorite = useCallback((pokemon: PokemonFavorite) => {
    setFavorites(prev => {
      // Evitar duplicados
      if (prev.some(f => f.id === pokemon.id)) {
        return prev;
      }
      return [...prev, pokemon];
    });
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const isFavorite = useCallback((id: number) => {
    return favorites.some(f => f.id === id);
  }, [favorites]);

  return (
    <PokemonContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      clearFavorites,
      isFavorite,
    }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemonContext(): PokemonContextType {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext debe usarse dentro de un PokemonProvider');
  }
  return context;
}
