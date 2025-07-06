import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'

interface SearchFieldProps {
  className?: string
}

export function SearchField({ className = '' }: SearchFieldProps) {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const search = useSearch({ strict: false })
  const navigate = useNavigate()

  useEffect(() => {
    if ('query' in search) {
      setSearchTerm(search.query || '')
    } else {
      setSearchTerm('')
    }
  }, [search])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    navigate({
      to: '/',
      search: ({ primary_release_year }) => ({
        query: searchTerm || undefined,
        primary_release_year,
      }),
    })
  }
  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar..."
          className="bg-bg border-border text-text placeholder-text-muted focus:border-primary focus:ring-primary w-full rounded-full border py-2 pr-4 pl-10 focus:ring-2 focus:outline-none"
          id="search-input"
          value={searchTerm}
          onChange={handleChange}
        />
        <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </form>
    </div>
  )
}
