import { Skeleton } from "../ui/skeleton";

export const HeroSkeleton = () => (
  <section className="relative w-full bg-slate-900 pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-24 md:pb-32">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-center">
        {/* Left column ------------------------------------------------*/}
        <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8">
          {/* badge */}
          <Skeleton className="h-6 w-32 rounded-full" />

          {/* headline */}
          <Skeleton className="h-12 sm:h-14 md:h-16 lg:h-20 w-3/4" />
          <Skeleton className="h-12 sm:h-14 md:h-16 lg:h-20 w-2/3" />

          {/* bio */}
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />

          {/* location / exp */}
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-36" />
          </div>

          {/* buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Skeleton className="h-11 w-40 rounded-md" />
            <Skeleton className="h-11 w-48 rounded-md" />
          </div>

          {/* stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center space-y-2">
                <Skeleton className="h-7 w-16 mx-auto" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Right column – code card ----------------------------------*/}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative max-w-lg w-full">
            {/* window chrome */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-700">
                <div className="flex gap-1.5">
                  <Skeleton className="h-2.5 w-2.5 rounded-full" />
                  <Skeleton className="h-2.5 w-2.5 rounded-full" />
                  <Skeleton className="h-2.5 w-2.5 rounded-full" />
                </div>
                <Skeleton className="h-4 w-32" />
              </div>

              {/* code area */}
              <div className="p-4 space-y-2">
                {[...Array(12)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>

            {/* floating icon */}
            <Skeleton className="hidden sm:flex absolute -top-3 -right-3 h-16 w-16 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </section>
);
