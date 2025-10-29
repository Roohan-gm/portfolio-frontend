import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const ContactSkeleton = () => (
  <section id="contact" className="py-20 bg-slate-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* heading */}
      <div className="text-center mb-16">
        <Skeleton className="h-9 md:h-10 mx-auto w-64" />
        <Skeleton className="h-6 mt-4 mx-auto w-96" />
      </div>

      {/* 3-column layout */}
      <div className="grid lg:grid-cols-3 gap-12">
        {/* left cards */}
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent className="space-y-6">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex items-center space-x-4">
                    <Skeleton className="w-6 h-6 rounded-md" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-20 mb-1" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* form card */}
        <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
          <CardHeader>
            <Skeleton className="h-7 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-11 w-full rounded-md" />
                  </div>
                ))}
              </div>
              {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton
                    className={`${i === 1 ? "h-36" : "h-11"} w-full rounded-md`}
                  />
                </div>
              ))}
              <Skeleton className="h-11 w-full rounded-md" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* bottom CTA bar */}
      <div className="text-center mt-16 p-8 border border-slate-700 rounded-2xl bg-slate-800/50">
        <Skeleton className="h-8 w-80 mx-auto mb-4" />
        <Skeleton className="h-5 w-96 mx-auto mb-6" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Skeleton className="h-11 w-52 rounded-md" />
          <Skeleton className="h-11 w-48 rounded-md" />
        </div>
      </div>
    </div>
  </section>
);
