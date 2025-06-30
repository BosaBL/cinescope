import { createFileRoute } from '@tanstack/react-router'
import { getMovieDetails } from '@/services/tmdb'
import { MovieDetails } from '@/components/movies/MovieDetails'

export const Route = createFileRoute('/details/$movieId')({
  component: MovieDetails,
  loader: async ({ params }) => {
    const movie = await getMovieDetails(Number(params.movieId))
    return {
      movie,
    }
  },
})
