import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Link } from '@tanstack/react-router'

interface PaginationProps {
  currentPage?: number
  totalPages: number
  siblingCount?: number
}

type PageNumber = number | '...'

const Paginator = ({
  currentPage = 1,
  totalPages,
  siblingCount = 1,
}: PaginationProps) => {
  totalPages = totalPages > 500 ? 500 : totalPages

  const range = (start: number, end: number): Array<number> => {
    const length = end - start + 1
    return Array.from({ length }, (_, idx) => start + idx)
  }

  const getPageNumbers = (): Array<PageNumber> => {
    const totalPageNumbersToShow = siblingCount + 5
    if (totalPages <= totalPageNumbersToShow) {
      return range(1, totalPages)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const shouldShowLeftEllipsis = leftSiblingIndex > 2
    const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPages

    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)
      return [...leftRange, '...', totalPages]
    }

    if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPages - rightItemCount + 1, totalPages)
      return [firstPageIndex, '...', ...rightRange]
    }

    if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex]
    }

    return []
  }

  const pageNumbers = getPageNumbers()

  return (
    <section className="flex items-center justify-end space-x-1">
      {/* Previous Button */}
      <Link
        to="/"
        search={(old) => ({
          ...old,
          page: currentPage,
        })}
        disabled={currentPage === 1}
        className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
          currentPage === 1
            ? 'bg-bg border-bg cursor-not-allowed'
            : 'text-text-muted bg-bg-light border-bg-light cursor-pointer'
        } `}
        aria-label="Página Anterior"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Link>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) =>
        page !== '...' ? (
          <Link
            key={index}
            to="/"
            search={(old) => ({
              ...old,
              page,
            })}
            disabled={page === currentPage}
            className={`bg-bg-light border-bg-light hover:text-text flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border font-medium transition-colors hover:border-stone-600 hover:bg-stone-600 ${
              page === currentPage &&
              'bg-primary border-primary pointer-events-none cursor-default text-white'
            } `}
            aria-label={`Ir a la página ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        ) : (
          <button
            key={index}
            disabled
            className={`cursor bg-bg border-bg text-text-muted flex h-10 w-10 items-center justify-center rounded-lg border font-medium transition-colors`}
            aria-label={'Más páginas'}
          >
            {page}
          </button>
        ),
      )}

      {/* Next Button */}
      <Link
        to="/"
        search={(old) => ({
          ...old,
          page: currentPage + 1,
        })}
        disabled={currentPage === totalPages}
        className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
          currentPage === totalPages
            ? 'bg-bg border-bg cursor-not-allowed'
            : 'text-text-muted bg-bg-light border-bg-light cursor-pointer'
        } `}
        aria-label="Siguiente Página"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Link>
    </section>
  )
}

export default Paginator
