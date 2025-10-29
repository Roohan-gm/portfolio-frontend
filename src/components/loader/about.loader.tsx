import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const AboutSkeleton = () => (
  <section id="about" className="py-20 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* heading */}
      <div className="text-center mb-16">
        <Skeleton className="h-9 md:h-10 mx-auto w-48" />
        <Skeleton className="h-6 mt-4 mx-auto w-96" />
      </div>

      {/* 3-column layout */}
      <div className="grid lg:grid-cols-3 gap-12">
        {/* left column (span 2) */}
        <div className="lg:col-span-2 space-y-8">
          {/* bio card */}
          <Card className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <Skeleton className="w-32 h-32 rounded-2xl flex-shrink-0" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-8 w-56" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
                <div className="flex flex-wrap gap-4 pt-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-36" />
                </div>
                <div className="flex gap-3 pt-4">
                  <Skeleton className="h-10 w-40 rounded-md" />
                  <Skeleton className="h-10 w-32 rounded-md" />
                </div>
              </div>
            </div>
          </Card>

          {/* experience timeline */}
          <Card className="p-8">
            <Skeleton className="h-7 w-56 mb-6" />
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="relative flex items-start space-x-4">
                  <Skeleton className="w-3 h-3 rounded-full mt-2" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* interests card */}
          <Card className="p-8">
            <Skeleton className="h-7 w-40 mb-6" />
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Skeleton className="h-6 w-36" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(6)].map((_, j) => (
                    <Skeleton key={j} className="h-5 w-20 rounded-full" />
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-6 w-28" />
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* right sidebar */}
        <div className="space-y-6">
          <Skeleton className="h-7 w-40" />
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24 mt-1" />
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {/* connect card */}
          <Card className="p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full mb-2" />
            ))}
          </Card>
        </div>
      </div>
    </div>
  </section>
);
