import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getWatchlist } from '@/services/watchlist'
import { MovieGrid } from '@/components/movies/MovieGrid'
import useTitle from '@/hooks/useTitle'

export const Route = createFileRoute('/watchList')({
  component: Watchlist,
})

function Watchlist() {
  const [watchlist, setWatchlist] = useState(() => getWatchlist())
  useTitle('CineScope - Mi Lista')

  useEffect(() => {
    // Define el manejador de eventos para cambios en el localStorage.
    const handleStorageChange = () => {
      setWatchlist(getWatchlist())
    }

    // Agrega el event listener para el evento 'storage'.
    window.addEventListener('localStorageUpdate', handleStorageChange)
    window.addEventListener('storage', handleStorageChange)

    // Limpia el event listener cuando el componente se desmonta.
    return () => {
      window.removeEventListener('localStorageUpdate', handleStorageChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-3xl font-bold">Mi Lista</h1>
      {watchlist.length > 0 ? (
        <MovieGrid movies={watchlist} />
      ) : (
        <div className="flex h-96 flex-col items-center justify-center">
          <p className="text-text-muted text-lg">
            Aún no has agregado películas a tu lista.
          </p>
        </div>
      )}
    </div>
  )
}
