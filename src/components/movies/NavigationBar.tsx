import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { SearchField } from './SearchField'

export function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <header className="bg-bg-dark border-border sticky top-0 z-50 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <nav className="flex h-16 items-center justify-between md:items-stretch">
            <div className="flex space-x-8">
              <Link to="/" className="flex h-full cursor-pointer items-center">
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
                    search={{ sort_by: 'popularity.desc' }}
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
                    <div className="bg-primary absolute bottom-0 left-0 h-1 w-0 rounded-full transition-all duration-300 group-[.active]:w-full" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Desktop Search & Mobile Buttons */}
            <div className="flex items-center">
              {/* Desktop Search */}
              <SearchField className="hidden md:flex" />

              {/* Mobile Buttons */}
              <div className="flex items-center md:hidden">
                {/*
                  Este es el botón de búsqueda que aparece en la versión móvil.
                  Al hacer clic en él, se activa la barra de búsqueda.
                 */}
                <button onClick={toggleSearch} className="cursor-pointer p-2">
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
                <button onClick={toggleMenu} className="cursor-pointer p-2">
                  <Bars3Icon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Search Bar Overlay */}
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
            <Link to="/" onClick={toggleMenu}>
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
                Inicio
                <div className="bg-primary absolute top-0 left-0 h-full w-0 rounded-full transition-all duration-300 group-[.active]:w-1" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
