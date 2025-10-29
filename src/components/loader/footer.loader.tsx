import { MapPin } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const FooterRowSkeleton = () => (
  <div className="grid gap-8 md:grid-cols-4">
    {/* Brand -------------------------------------------------------*/}
    <div className="md:col-span-2 space-y-4">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-8 w-12 rounded-lg" />
        <Skeleton className="h-6 w-40" />
      </div>
      <Skeleton className="h-5 w-full max-w-md" />
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-slate-600" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>

    {/* Quick links -----------------------------------------------*/}
    <div>
      <Skeleton className="mb-4 h-5 w-24" />
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-20" />
        ))}
      </div>
    </div>

    {/* Connect ---------------------------------------------------*/}
    <div>
      <Skeleton className="mb-4 h-5 w-16" />
      <div className="flex gap-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-7 w-7 rounded-full" />
        ))}
      </div>
      <Skeleton className="mt-3 h-4 w-40" />
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* 2.  The actual loading footer                                     */
/* ------------------------------------------------------------------ */
export const LoadingFooter = () => (
  <footer className="border-t border-slate-800 bg-slate-900 text-white">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <FooterRowSkeleton />

      {/* Bottom bar skeleton --------------------------------------*/}
      <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-800 pt-6 md:flex-row">
        <Skeleton className="mb-4 h-4 w-64 md:mb-0" />
        <div className="flex gap-4">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>

      {/* Tech-stack line ------------------------------------------*/}
      <div className="mt-4 border-t border-slate-800/50 pt-4">
        <Skeleton className="mx-auto h-3 w-80" />
      </div>
    </div>
  </footer>
);
