import { createFileRoute } from '@tanstack/react-router'
import type {
  DiscoverMoviesFilters,
  SearchMoviesParams,
} from '@/services/tmdb/types'
import { discoverMovies, searchMovies } from '@/services/tmdb'
import { App } from '@/components/App'

export const Route = createFileRoute('/')({
  component: App,
  validateSearch: (
    search: DiscoverMoviesFilters | SearchMoviesParams,
  ): DiscoverMoviesFilters | SearchMoviesParams => {
    if ('query' in search) {
      return {
        query: search.query,
        page: search.page ?? 1,
      }
    }

    return {
      sort_by: search.sort_by ?? 'popularity.desc',
      page: search.page ?? 1,
    }
  },
  loaderDeps: (search) => ({ search }),
  loader: ({ deps }) => {
    const search = deps.search.search

    if ('query' in search) {
      const movies = searchMovies(search)
      return {
        deferredSlowData: movies,
      }
    }

    const movies = discoverMovies(search)
    return {
      deferredSlowData: movies,
    }
  },
})
