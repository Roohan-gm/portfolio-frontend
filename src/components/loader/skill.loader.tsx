import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const SkillsSkeleton = () => (
  <section id="skills" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* heading */}
      <div className="text-center mb-16">
        <Skeleton className="h-9 md:h-10 mx-auto w-64" />
        <Skeleton className="h-6 mt-4 mx-auto w-96" />
      </div>

      {/* skill-category cards */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="border-gray-200">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Skeleton className="w-6 h-6 rounded-md" />
                <Skeleton className="h-6 w-40" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[...Array(9)].map((_, j) => (
                  <Skeleton key={j} className="h-5 w-16 rounded-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* expertise levels */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-52" />
                <Skeleton className="h-4 w-8" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <Skeleton className="h-32 w-full rounded-lg" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      </div>

      {/* bottom stats bar */}
      <div className="mt-16 rounded-2xl">
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    </div>
  </section>
);
