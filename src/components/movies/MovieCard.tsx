import { HeartIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { Movie } from '@/services/tmdb/types'
import {
  isInWatchlist as checkIsInWatchlist,
  onToggleWatchlist,
} from '@/services/watchlist'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const year = new Date(movie.release_date).getFullYear()

  const [isInWatchlist, setIsWatchlist] = useState(() =>
    checkIsInWatchlist(movie.id),
  )

  useEffect(() => {
    const handleStorageChange = () => {
      setIsWatchlist(checkIsInWatchlist(movie.id))
    }

    window.addEventListener('localStorageUpdate', handleStorageChange)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('localStorageUpdate', handleStorageChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [movie.id])

  return (
    <section className="bg-bg border-border group hover:border-primary rounded-lg border-2 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative select-none">
        <Link to="/details/$movieId" params={{ movieId: movie.id.toString() }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="h-80 w-full cursor-pointer rounded-t-lg object-cover"
            onError={(e) => {
              e.currentTarget.src =
                'https://placehold.co/500x750/374151/9CA3AF?text=No+Existe+Imágen'
            }}
            loading="lazy"
          />
        </Link>
        <div className="bg-surface/80 text-warning absolute top-2 right-2 flex items-center gap-1 rounded px-2 py-1 text-sm font-bold backdrop-blur-sm">
          <StarIcon className="h-4 w-4" />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
        <button
          onClick={() => onToggleWatchlist(movie)}
          className={`bg-surface/80 hover:bg-hover absolute top-2 left-2 cursor-pointer rounded-full p-2 backdrop-blur-sm transition-all ${
            isInWatchlist ? 'text-danger' : 'text-text-muted hover:text-text'
          }`}
        >
          <HeartIcon
            className={`w-5 ${isInWatchlist && 'fill-danger text-danger'}`}
          />
        </button>
      </div>
      <div className="p-4">
        <Link to="/details/$movieId" params={{ movieId: movie.id.toString() }}>
          <h3 className="text-text group-hover:text-secondary mb-2 cursor-pointer text-lg font-bold transition-colors">
            {movie.title}
          </h3>
        </Link>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-text-muted text-sm">
            {year || 'No hay información.'}
          </span>
          <div className="flex items-center gap-1">
            <StarIcon className="text-warning h-4 w-4" />
            <span className="text-warning text-sm font-medium">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
        <p className="text-text-muted line-clamp-3 text-sm">{movie.overview}</p>
      </div>
    </section>
  )
}
