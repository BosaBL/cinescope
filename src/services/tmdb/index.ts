import axios from 'axios'
import type {
  DiscoverMoviesFilters,
  Movie,
  MovieDetails,
  PaginatedResponse,
  SearchMoviesParams,
} from './types'

// Obtiene la clave de la API desde las variables de entorno de Vite.
const apiKey = import.meta.env.VITE_API_KEY

// Crea una nueva instancia de Axios con una configuración personalizada.
const tmdbApiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
    // Configura el encabezado de autorización utilizando el esquema Bearer.
    Authorization: `Bearer ${apiKey}`,
  },
  params: {
    // Lenguaje predeterminado para las respuestas de la API.
    language: 'es-CL',
  },
})

/**
 * Obtiene una lista de películas basada en filtros de descubrimiento.
 * @param filters - Las opciones de filtrado y ordenamiento para la consulta.
 * @returns Una promesa que se resuelve en una respuesta paginada de películas.
 */
export const discoverMovies = async (
  filters: DiscoverMoviesFilters = {},
): Promise<PaginatedResponse<Movie>> => {
  const response = await tmdbApiClient.get<PaginatedResponse<Movie>>(
    '/discover/movie',
    {
      params: filters,
    },
  )
  return response.data
}

/**
 * Busca películas por un término de búsqueda.
 * @param params - Los parámetros para la búsqueda, incluyendo el query y la página.
 * @returns Una promesa que se resuelve en una respuesta paginada de películas.
 */
export const searchMovies = async (
  params: SearchMoviesParams,
): Promise<PaginatedResponse<Movie>> => {
  const response = await tmdbApiClient.get<PaginatedResponse<Movie>>(
    '/search/movie',
    {
      params,
    },
  )
  return response.data
}

/**
 * Obtiene los detalles completos de una película específica.
 * @param movieId - El ID de la película a obtener.
 * @returns Una promesa que se resuelve con los detalles de la película.
 */
export const getMovieDetails = async (
  movieId: number,
): Promise<MovieDetails> => {
  const response = await tmdbApiClient.get<MovieDetails>(`/movie/${movieId}`)
  return response.data
}

export default tmdbApiClient
