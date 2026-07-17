import axios from 'axios';
import type { PokemonDetail, PokemonSpecies } from '../types/pokemon';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemonByName = async (name: string): Promise<PokemonDetail> => {
  const cleanName = name.trim().toLowerCase();
  if (!cleanName) {
    throw new Error('El nombre del Pokémon no puede estar vacío');
  }
  const response = await axios.get<PokemonDetail>(`${API_URL}/${cleanName}`);
  return response.data;
};

export const getPokemonById = async (id: number): Promise<PokemonDetail> => {
  const response = await axios.get<PokemonDetail>(`${API_URL}/${id}`);
  return response.data;
};

export const getPokemonSpecies = async (url: string): Promise<PokemonSpecies> => {
  const response = await axios.get<PokemonSpecies>(url);
  return response.data;
};

export const getPokemonList = async (limit: number = 100000, offset: number = 0) => {
  const response = await axios.get(`${API_URL}?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const getPokemonByUrl = async (url: string): Promise<PokemonDetail> => {
  const response = await axios.get<PokemonDetail>(url);
  return response.data;
};
