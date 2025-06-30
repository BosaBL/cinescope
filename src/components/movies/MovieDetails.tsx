import { useLoaderData } from '@tanstack/react-router'
import { StarIcon } from '@heroicons/react/24/solid'
import { HeartIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import {
  isInWatchlist as checkIsInWatchlist,
  onToggleWatchlist,
} from '@/services/watchlist'
import useTitle from '@/hooks/useTitle'

export function MovieDetails() {
  const { movie } = useLoaderData({ strict: true, from: '/details/$movieId' })
  const [isInWatchlist, setIsInWatchlist] = useState(() =>
    checkIsInWatchlist(movie.id),
  )

  useTitle(`CineScope - ${movie.title}`)

  useEffect(() => {
    const handleStorageChange = () => {
      setIsInWatchlist(checkIsInWatchlist(movie.id))
    }

    window.addEventListener('localStorageUpdate', handleStorageChange)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('localStorageUpdate', handleStorageChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [movie.id])

  const year = new Date(movie.release_date).getFullYear()
  const hours = movie.runtime && Math.floor(movie.runtime / 60)
  const minutes = movie.runtime && movie.runtime % 60

  return (
    <div className="bg-bg text-text mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="mx-auto w-full max-w-sm rounded-lg shadow-lg lg:max-w-full"
            onError={(e) => {
              e.currentTarget.src =
                'https://placehold.co/500x750/374151/9CA3AF?text=No+Existe+Imágen'
            }}
          />
        </div>

        <div className="lg:col-span-2">
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-4xl font-bold">{movie.title}</h1>
              <div className="text-text-muted my-4 flex flex-wrap items-center gap-x-4">
                <span>{year || 'No hay información.'}</span>
                <span>•</span>
                <span>
                  {hours}h {minutes}m
                </span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <StarIcon className="text-warning h-5 w-5" />
                  <span className="font-semibold">
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-surface text-text-muted rounded-full px-3 py-1 text-sm capitalize"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              {isInWatchlist ? (
                <button
                  onClick={() => onToggleWatchlist(movie)}
                  className="bg-primary hover:bg-primary-muted flex cursor-pointer items-center gap-x-2 rounded-lg px-6 py-3 font-medium transition-all"
                >
                  <HeartIcon className="h-6" />
                  <span>Agregar a mi lista</span>
                </button>
              ) : (
                <button
                  onClick={() => onToggleWatchlist(movie)}
                  className="bg-danger hover:bg-danger-muted flex cursor-pointer items-center gap-x-2 rounded-lg px-6 py-3 font-medium transition-all"
                >
                  <XCircleIcon className="h-6" />
                  <span>Eliminar de mi lista</span>
                </button>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Resumen</h2>
              <p className="text-text-muted mt-4 text-lg leading-relaxed">
                {movie.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="bg-surface rounded-lg p-4">
                <h3 className="text-accent font-semibold">Presupuesto</h3>
                <p className="text-xl">
                  {movie.budget > 0
                    ? movie.budget.toLocaleString('es-CL', {
                        style: 'currency',
                        currency: 'USD',
                      })
                    : 'No disponible'}
                </p>
              </div>
              <div className="bg-surface rounded-lg p-4">
                <h3 className="text-accent font-semibold">Ingresos</h3>
                <p className="text-xl">
                  {movie.revenue > 0
                    ? movie.revenue.toLocaleString('es-CL', {
                        style: 'currency',
                        currency: 'USD',
                      })
                    : 'No disponible'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
