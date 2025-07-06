import {
  Link,
  useLoaderData,
  useNavigate,
  useSearch,
} from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  Bars3Icon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { SearchField } from './SearchField'
import { getWatchlist } from '@/services/watchlist'

export function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [genre, setGenre] = useState<string>('')
  const [year, setYear] = useState<number>(0)
  const [watchlistCount, setWatchlistCount] = useState(0)
  const search = useSearch({ strict: false })
  const navigate = useNavigate()

  useEffect(() => {
    if ('with_genres' in search) {
      setGenre(search.with_genres || '')
      setYear(search.primary_release_year || 0)
    }
  }, [search])

  useEffect(() => {
    const updateWatchlistCount = () => {
      setWatchlistCount(getWatchlist().length)
    }

    updateWatchlistCount()

    window.addEventListener('localStorageUpdate', updateWatchlistCount)
    window.addEventListener('storage', updateWatchlistCount)

    return () => {
      window.removeEventListener('localStorageUpdate', updateWatchlistCount)
      window.removeEventListener('storage', updateWatchlistCount)
    }
  }, [])

  const { genres } = useLoaderData({ from: '__root__' })

  useEffect(() => {
    if (isMenuOpen || isFilterOpen) {
      document.body.classList.add('overflow-y-hidden')
    } else {
      document.body.classList.remove('overflow-y-hidden')
    }
  }, [isFilterOpen, isSearchOpen, isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const toggleFilter = () => {
    if (isFilterOpen) {
      if (!search.with_genres) {
        setGenre(search.with_genres || '')
      }
      if (!search.primary_release_year) {
        setYear(search.primary_release_year || 0)
      }
    }
    setIsFilterOpen(!isFilterOpen)
  }

  const handleResetFilters = () => {
    setGenre('')
    setYear(0)
    toggleFilter()
    navigate({
      to: '/',
    })
  }

  const onSubmitFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toggleFilter()
    navigate({
      to: '/',
      search: (old) => ({
        ...old,
        with_genres: genre || undefined,
        primary_release_year: year || undefined,
      }),
    })
  }

  return (
    <header className="bg-bg-dark border-border sticky top-0 z-50 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <nav className="flex h-16 items-center justify-between md:items-stretch">
            <div className="flex space-x-8">
              <Link
                to="/"
                search={({ query, ...rest }) => ({
                  ...rest,
                  sort_by: 'popularity.desc',
                })}
                className="flex h-full cursor-pointer items-center"
              >
                <h1 className="text-2xl font-bold">
                  Cine
                  <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
                    Scope
                  </span>
                </h1>
              </Link>

              {/* Desktop Menu */}
              <ul className="hidden items-center space-x-4 md:flex md:items-stretch">
                <li>
                  <Link
                    to="/"
                    className="group relative flex h-full items-center"
                    activeProps={{ className: 'font-bold active' }}
                    search={({ query, ...rest }) => ({
                      ...rest,
                      sort_by: 'popularity.desc',
                    })}
                  >
                    Inicio
                    <div className="bg-primary absolute bottom-0 left-0 h-1 w-0 rounded-full transition-all duration-300 group-[.active]:w-full" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/watchList"
                    className="group relative flex h-full items-center"
                    activeProps={{ className: 'font-bold active' }}
                  >
                    Mis Películas
                    {watchlistCount > 0 && (
                      <span className="bg-primary-muted text-accent-foreground absolute top-1/6 -right-5 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold">
                        {watchlistCount}
                      </span>
                    )}
                    <div className="bg-primary absolute bottom-0 left-0 h-1 w-0 rounded-full transition-all duration-300 group-[.active]:w-full" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Desktop Search & Mobile Buttons */}
            <div className="flex items-center">
              {/* Desktop Search and Filter */}
              <div className="hidden items-center space-x-2 md:flex">
                <SearchField />
                <button onClick={toggleFilter} className="cursor-pointer p-2">
                  <FunnelIcon
                    className={`h-6 w-6 ${(genre || year) && 'text-primary'} transition-all duration-300`}
                  />
                </button>
              </div>

              {/* Mobile Buttons */}
              <div className="flex items-center md:hidden">
                {/*
                  Este es el botón de búsqueda que aparece en la versión móvil.
                  Al hacer clic en él, se activa la barra de búsqueda.
                 */}
                <button onClick={toggleSearch} className="cursor-pointer p-2">
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
                <button onClick={toggleFilter} className="cursor-pointer p-2">
                  <FunnelIcon className="h-6 w-6" />
                </button>
                <button onClick={toggleMenu} className="cursor-pointer p-2">
                  <Bars3Icon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Search Bar Backdrop */}
          <div
            className={`bg-bg-dark absolute top-0 left-0 w-full rounded-2xl p-4 shadow-lg transition-transform duration-300 md:hidden ${
              isSearchOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <div className="relative flex items-center">
              <SearchField className="w-full" />
              <button
                onClick={toggleSearch}
                className="absolute top-1/2 right-2 -translate-y-1/2 p-2"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          isMenuOpen ? '' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'
          }`}
          onClick={toggleMenu}
        />

        {/* Menu Content */}
        <div
          className={`bg-bg-dark relative h-full w-64 transform transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="border-border flex items-center justify-between border-b p-4">
            <Link
              search={({ query, ...rest }) => ({
                ...rest,
                sort_by: 'popularity.desc',
              })}
              to="/"
              onClick={toggleMenu}
            >
              <h1 className="text-2xl font-bold">
                Cine
                <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
                  Scope
                </span>
              </h1>
            </Link>
            <button onClick={toggleMenu} className="cursor-pointer p-2">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <Link
                to="/"
                className="group relative flex items-center"
                activeProps={{ className: 'font-bold active pl-2' }}
                search={({ query, ...rest }) => ({
                  ...rest,
                  sort_by: 'popularity.desc',
                })}
                onClick={toggleMenu}
              >
                Inicio
                <div className="bg-primary absolute top-0 left-0 h-full w-0 rounded-full transition-all duration-300 group-[.active]:w-1" />
              </Link>
            </li>
            <li>
              <Link
                to="/watchList"
                className="group relative flex items-center"
                activeProps={{ className: 'font-bold active pl-2' }}
                onClick={toggleMenu}
              >
                Mis Películas
                {watchlistCount > 0 && (
                  <span className="bg-primary-muted text-accent-foreground ml-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold">
                    {watchlistCount}
                  </span>
                )}
                <div className="bg-primary absolute top-0 left-0 h-full w-0 rounded-full transition-all duration-300 group-[.active]:w-1" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Filter Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          isFilterOpen ? '' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isFilterOpen ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'
          }`}
          onClick={toggleFilter}
        />

        {/* Filter Content */}
        <div
          className={`bg-bg-dark relative w-11/12 max-w-md transform rounded-lg p-6 shadow-lg transition-transform duration-300 ${
            isFilterOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <div className="border-border-b mb-4 flex items-center justify-between border-b pb-4">
            <h2 className="text-xl font-bold">Filtrar Películas</h2>
            <button onClick={toggleFilter} className="cursor-pointer p-2">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={onSubmitFilter}>
            {/* Year Range Filter */}
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-semibold">Año</h3>
              <div className="flex space-x-4">
                <input
                  type="number"
                  min="1900"
                  value={year || ''}
                  onChange={(e) => setYear(Number(e.target.value))}
                  max={new Date().getFullYear()}
                  placeholder="Año"
                  className="bg-bg border-border text-text w-1/2 rounded-md border p-2"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-semibold">Género</h3>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="bg-bg border-border text-text w-full rounded-md border p-2"
              >
                <option value="" className="text-text-muted">
                  Escoger Género
                </option>
                {genres.map(({ name, id }) => (
                  <option key={id} value={id} className="text-text-muted">
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-stretch justify-end space-x-4">
              <button
                type="button"
                className="bg-danger text-text-inverted hover:bg-danger-muted-muted cursor-pointer rounded-md px-4 py-2 font-semibold"
                onClick={() => handleResetFilters()}
              >
                Remover Filtros
              </button>
              <button
                type="submit"
                className="bg-primary text-text-inverted hover:bg-primary-muted cursor-pointer rounded-md px-4 py-2 font-semibold"
              >
                Aplicar Filtros
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  )
}
