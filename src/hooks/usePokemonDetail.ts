import { useState, useEffect } from 'react';
import type { PokemonDetail, PokemonSpecies } from '../types/pokemon';
import { getPokemonByName, getPokemonSpecies } from '../services/pokemonService';

interface UsePokemonDetailReturn {
  pokemon: PokemonDetail | null;
  species: PokemonSpecies | null;
  loading: boolean;
  error: string | null;
}

export function usePokemonDetail(nameOrId: string | number | null): UsePokemonDetailReturn {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nameOrId) {
      setPokemon(null);
      setSpecies(null);
      return;
    }

    const fetchDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const pokemonData = await getPokemonByName(String(nameOrId));
        setPokemon(pokemonData);

        const speciesData = await getPokemonSpecies(pokemonData.species.url);
        setSpecies(speciesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al obtener el Pokémon');
        setPokemon(null);
        setSpecies(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [nameOrId]);

  return { pokemon, species, loading, error };
}
