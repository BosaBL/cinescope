import { Await, useLoaderData } from '@tanstack/react-router'
import { MovieGrid } from './movies/MovieGrid'
import { MovieGridSkeleton } from './movies/MovieGridSkeleton'
import Paginator from './movies/Paginator'
import useTitle from '@/hooks/useTitle'

export function App() {
  const { deferredSlowData } = useLoaderData({ strict: true, from: '/' })

  useTitle(`CineScope - Inicio`)

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <Await promise={deferredSlowData} fallback={<MovieGridSkeleton />}>
        {(movies) => (
          <>
            <div className="my-8">
              <Paginator
                currentPage={movies.page}
                totalPages={movies.total_pages}
              />
            </div>
            <MovieGrid movies={movies.results} />
            <div className="mt-8">
              <Paginator
                currentPage={movies.page}
                totalPages={movies.total_pages}
              />
            </div>
          </>
        )}
      </Await>
    </div>
  )
}
