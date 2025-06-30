// Nota: Este archivo fue generado de manera automática a partir de la
// documentación con estándar OpenAPI de TMDB.

// Interfaz base para una respuesta paginada de la API de TMDb.
export interface PaginatedResponse<T> {
  page: number
  results: Array<T>
  total_pages: number
  total_results: number
}

// --- Tipos de Medios Principales ---

export interface Genre {
  id: number
  name: string
}

export interface Movie {
  adult: boolean
  backdrop_path: string | null
  genre_ids: Array<number>
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface TvShow {
  adult: boolean
  backdrop_path: string | null
  genre_ids: Array<number>
  id: number
  origin_country: Array<string>
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string | null
  first_air_date: string
  name: string
  vote_average: number
  vote_count: number
}

export interface Person {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  known_for: Array<Movie | TvShow>
}

// --- Tipos Detallados ---

export interface MovieDetails extends Movie {
  belongs_to_collection: object | null
  budget: number
  genres: Array<Genre>
  homepage: string | null
  imdb_id: string | null
  production_companies: Array<{
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }>
  production_countries: Array<{
    iso_3166_1: string
    name: string
  }>
  revenue: number
  runtime: number | null
  spoken_languages: Array<{
    english_name: string
    iso_639_1: string
    name: string
  }>
  status: string
  tagline: string | null
}

export interface TvShowDetails extends TvShow {
  created_by: Array<{
    id: number
    credit_id: string
    name: string
    gender: number
    profile_path: string | null
  }>
  episode_run_time: Array<number>
  genres: Array<Genre>
  homepage: string | null
  in_production: boolean
  languages: Array<string>
  last_air_date: string
  last_episode_to_air: object | null // Reemplazar con un tipo específico si es necesario
  next_episode_to_air: object | null // Reemplazar con un tipo específico si es necesario
  networks: Array<{
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }>
  number_of_episodes: number
  number_of_seasons: number
  production_companies: Array<{
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }>
  production_countries: Array<{
    iso_3166_1: string
    name: string
  }>
  seasons: Array<{
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string | null
    season_number: number
    vote_average: number
  }>
  spoken_languages: Array<{
    english_name: string
    iso_639_1: string
    name: string
  }>
  status: string
  tagline: string | null
  type: string
}

// --- Tipos para la Función de Descubrimiento ---

/**
 * Define las opciones de ordenamiento disponibles para el endpoint de descubrimiento de películas.
 * Los valores corresponden a las opciones soportadas por la API de TMDb.
 * @see https://developer.themoviedb.org/reference/discover-movie
 */
export type DiscoverMovieSortBy =
  | 'popularity.asc'
  | 'popularity.desc'
  | 'release_date.asc'
  | 'release_date.desc'
  | 'revenue.asc'
  | 'revenue.desc'
  | 'primary_release_date.asc'
  | 'primary_release_date.desc'
  | 'original_title.asc'
  | 'original_title.desc'
  | 'vote_average.asc'
  | 'vote_average.desc'
  | 'vote_count.asc'
  | 'vote_count.desc'

/**
 * Interfaz para los filtros disponibles en la función discoverMovies.
 */
export interface DiscoverMoviesFilters {
  /**
   * Filtra películas estrenadas en o después de esta fecha.
   * Formateado como YYYY-MM-DD.
   */
  'release_date.gte'?: string
  /**
   * Filtra películas estrenadas en o antes de esta fecha.
   * Formateado como YYYY-MM-DD.
   */
  'release_date.lte'?: string
  /**
   * Ordena los resultados por el criterio especificado.
   */
  sort_by?: DiscoverMovieSortBy
  /**
   * Filtra películas por uno o más IDs de género.
   * El valor debe ser una cadena de IDs de género separados por comas.
   */
  with_genres?: string
  /**
   * El número de página a obtener.
   */
  page?: number
  /**
   * El año de la película a buscar.
   */
  primary_release_year?: number
}

// --- Tipos para la Función de Búsqueda ---

/**
 * Interfaz para los parámetros disponibles en la función searchMovies.
 */
export interface SearchMoviesParams {
  /**
   * El texto a buscar en los títulos de las películas.
   */
  query: string
  /**
   * El número de página a obtener.
   */
  page?: number
  /**
   * El año de la película a buscar.
   */
  primary_release_year?: number
}
