import { Skeleton } from "../ui/skeleton";

export const HeaderSkeleton = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* logo + name */}
        <div className="flex items-center space-x-2">
          <Skeleton className="w-11 h-8 rounded-lg" />
          <Skeleton className="h-5 w-32 hidden sm:block" />
        </div>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-12" />
          ))}
        </nav>

        {/* social + CTA */}
        <div className="hidden md:flex items-center space-x-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="w-6 h-6 rounded-full" />
          ))}
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>

        {/* mobile burger */}
        <Skeleton className="md:hidden w-6 h-6 rounded-sm" />
      </div>
    </div>
  </header>
);
