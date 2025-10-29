import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const ProjectsSkeleton = () => (
  <section id="projects" className="py-20 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* heading */}
      <div className="text-center mb-16">
        <Skeleton className="h-9 md:h-10 mx-auto w-64" />
        <Skeleton className="h-6 mt-4 mx-auto w-96" />
      </div>

      {/* filter pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-md" />
        ))}
      </div>

      {/* cards grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="border-gray-200">
            <CardHeader className="pb-4">
              {/* image */}
              <Skeleton className="w-full h-48 rounded-lg mb-4" />
              {/* badge */}
              <Skeleton className="absolute top-2 right-2 h-6 w-16 rounded-full" />
              {/* title */}
              <Skeleton className="h-6 w-3/4" />
              {/* desc */}
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-5/6" />
            </CardHeader>

            <CardContent className="space-y-4">
              {/* tech pills */}
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, j) => (
                  <Skeleton key={j} className="h-5 w-14 rounded-full" />
                ))}
              </div>

              {/* rating / downloads row */}
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-14" />
                </div>
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>

              {/* action buttons */}
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 flex-1 rounded-md" />
                <Skeleton className="h-9 flex-1 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
