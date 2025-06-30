import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { NavigationBar } from '@/components/movies/NavigationBar'

export const Route = createRootRoute({
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
