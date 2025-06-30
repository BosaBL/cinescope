function MovieCardSkeleton() {
  return (
    <section className="border-bg bg-bg animate-pulse rounded-lg border-2 shadow-lg">
      {/* Image skeleton */}
      <div className="relative">
        <div className="bg-bg-light h-80 w-full rounded-t-lg"></div>

        {/* Rating badge skeleton */}
        <div className="bg-bg absolute top-2 right-2 flex items-center gap-1 rounded px-2 py-1">
          <div className="bg-bg-light h-4 w-4 rounded"></div>
          <div className="bg-bg-light h-4 w-8 rounded"></div>
        </div>

        {/* Heart button skeleton */}
        <div className="bg-bg absolute top-2 left-2 h-9 w-9 rounded-full"></div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-3 p-4">
        {/* Title skeleton */}
        <div className="bg-bg-light h-6 w-3/4 rounded"></div>

        {/* Year and rating row skeleton */}
        <div className="flex items-center justify-between">
          <div className="bg-bg-light h-4 w-16 rounded"></div>
          <div className="flex items-center gap-1">
            <div className="bg-bg-light h-4 w-4 rounded"></div>
            <div className="bg-bg-light h-4 w-8 rounded"></div>
          </div>
        </div>

        {/* Overview skeleton - 3 lines */}
        <div className="space-y-2">
          <div className="bg-bg-light h-4 w-full rounded"></div>
          <div className="bg-bg-light h-4 w-5/6 rounded"></div>
          <div className="bg-bg-light h-4 w-2/3 rounded"></div>
        </div>
      </div>
    </section>
  )
}

interface PaginatorSkeletonProps {
  pageCount?: number
}

export function PaginatorSkeleton({ pageCount = 7 }: PaginatorSkeletonProps) {
  return (
    <div className="my-8">
      <section className="flex animate-pulse items-center justify-end space-x-1">
        {/* Previous Button Skeleton */}
        <div className="border-bg bg-bg flex h-10 w-10 items-center justify-center rounded-lg border">
          <div className="bg-bg-light h-4 w-4 rounded"></div>
        </div>

        {/* Page Numbers Skeleton */}
        {Array.from({ length: pageCount }, (_, index) => (
          <div
            key={index}
            className="border-bg bg-bg flex h-10 w-10 items-center justify-center rounded-lg border"
          >
            <div className="bg-bg-light h-4 w-4 rounded"></div>
          </div>
        ))}

        {/* Next Button Skeleton */}
        <div className="border-bg bg-bg flex h-10 w-10 items-center justify-center rounded-lg border">
          <div className="bg-bg-light h-4 w-4 rounded"></div>
        </div>
      </section>
    </div>
  )
}

export function MovieGridSkeleton() {
  return (
    <>
      <PaginatorSkeleton />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }, (_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </>
  )
}
