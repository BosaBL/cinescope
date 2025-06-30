import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { NavigationBar } from '@/components/movies/NavigationBar'
import { getGenres } from '@/services/tmdb'

export const Route = createRootRoute({
  loader: async () => {
    const genres = (await getGenres()).genres

    return {
      genres,
    }
  },
  component: () => (
    <>
      <NavigationBar />
      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
})
