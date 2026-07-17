import { useState, useEffect } from 'react';
import type { PokemonListItem, PokemonListResponse, PokemonDetail } from '../types/pokemon';
import { getPokemonByUrl, getPokemonList } from '../services/pokemonService';

interface UsePokemonListReturn {
  pokemon: PokemonDetail[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  page: number;
  setPage: (page: number) => void;
  search: string;
  setSearch: (search: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}

const ITEMS_PER_PAGE = 20;

export function usePokemonList(): UsePokemonListReturn {
  const [allPokemon, setAllPokemon] = useState<PokemonListItem[]>([]);
  const [pokemon, setPokemon] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Fetch all Pokemon names on mount
  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const data: PokemonListResponse = await getPokemonList();
        setAllPokemon(data.results);
        setTotalCount(data.count);
      } catch (err) {
        setError('Error al cargar la lista de Pokémon');
        console.error(err);
      }
    };
    fetchAllPokemon();
  }, []);

  // Filter, paginate, and fetch details
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        let filtered = [...allPokemon];

        // Filter by search
        if (search) {
          filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
          );
        }

        // Filter by type (we'll type-check after fetching)
        let typeFiltered: PokemonDetail[] = [];
        const offset = (page - 1) * ITEMS_PER_PAGE;
        const pageItems = filtered.slice(offset, offset + ITEMS_PER_PAGE);

        if (pageItems.length === 0) {
          setPokemon([]);
          setLoading(false);
          return;
        }

        // Fetch details for current page using Axios service
        const detailsPromises = pageItems.map(item => getPokemonByUrl(item.url));
        const details = await Promise.all(detailsPromises);

        // Apply type filter
        if (selectedType) {
          typeFiltered = details.filter(p =>
            p.types.some(t => t.type.name === selectedType)
          );
        } else {
          typeFiltered = details;
        }

        setPokemon(typeFiltered);
        if (!search && !selectedType) {
          setTotalCount(allPokemon.length);
        }
      } catch (err) {
        setError('Error al obtener los detalles de Pokémon');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (allPokemon.length > 0) {
      fetchPokemonDetails();
    }
  }, [allPokemon, page, search, selectedType]);

  return {
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
  };
}
