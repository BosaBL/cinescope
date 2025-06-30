import type { Movie } from './tmdb/types'

const WATCHLIST_KEY = 'watchlist'

/**
 * Obtiene la lista de películas desde el localStorage.
 * @returns Un array de películas o un array vacío si no hay ninguna.
 */
export function getWatchlist(): Array<Movie> {
  const watchlistJSON = localStorage.getItem(WATCHLIST_KEY)
  return watchlistJSON ? JSON.parse(watchlistJSON) : []
}

/**
 * Guarda la lista de películas en el localStorage.
 * @param watchlist - El array de películas a guardar.
 */
function saveWatchlist(watchlist: Array<Movie>): void {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist))
  window.dispatchEvent(new Event('localStorageUpdate'))
}

/**
 * Agrega una película a la lista de seguimiento.
 * @param movie - La película a agregar.
 */
export function addToWatchlist(movie: Movie): void {
  const watchlist = getWatchlist()
  if (!watchlist.some((m) => m.id === movie.id)) {
    watchlist.push(movie)
    saveWatchlist(watchlist)
  }
}

/**
 * Elimina una película de la lista de seguimiento.
 * @param movieId - El ID de la película a eliminar.
 */
export function removeFromWatchlist(movieId: number): void {
  let watchlist = getWatchlist()
  watchlist = watchlist.filter((m) => m.id !== movieId)
  saveWatchlist(watchlist)
}

/**
 * Verifica si una película está en la lista de seguimiento.
 * @param movieId - El ID de la película a verificar.
 * @returns `true` si la película está en la lista, de lo contrario `false`.
 */
export function isInWatchlist(movieId: number): boolean {
  const watchlist = getWatchlist()
  return watchlist.some((m) => m.id === movieId)
}

/**
 * Elimina o agrega una pelicula a la lista. Si ya se encuentra en la lista,
 * se elimina; si no, se agrega.
 * @param movie - Pelicula que se quiere añadir/remover de la lista.
 */
export function onToggleWatchlist(movie: Movie) {
  if (isInWatchlist(movie.id)) {
    removeFromWatchlist(movie.id)
  } else {
    addToWatchlist(movie)
  }
}
