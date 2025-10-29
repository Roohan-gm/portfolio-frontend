// loader/contact.loader.tsx
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const ContactSkeleton = () => (
  <section id="contact" className="py-20 bg-slate-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* heading – fluid */}
      <div className="text-center mb-16">
        <Skeleton className="h-9 md:h-10 mx-auto w-full max-w-md" />
        <Skeleton className="h-6 mt-4 mx-auto w-full max-w-xl" />
      </div>

      {/* 3-column layout – stack on small screens */}
      <div className="grid lg:grid-cols-3 gap-12">
        {/* left cards */}
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <Skeleton className="h-6 w-full max-w-xs" />
              </CardHeader>
              <CardContent className="space-y-6">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex items-center space-x-4">
                    <Skeleton className="w-6 h-6 rounded-md" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-full max-w-[8rem] mb-1" />
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
            <Skeleton className="h-7 w-full max-w-xs" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-full max-w-[6rem]" />
                    <Skeleton className="h-11 w-full rounded-md" />
                  </div>
                ))}
              </div>
              {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-full max-w-[6rem]" />
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

      {/* bottom CTA – fluid */}
      <div className="text-center mt-16 p-8 border border-slate-700 rounded-2xl bg-slate-800/50">
        <Skeleton className="h-8 w-full max-w-xl mx-auto mb-4" />
        <Skeleton className="h-5 w-full max-w-2xl mx-auto mb-6" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Skeleton className="h-11 w-full max-w-[13rem] rounded-md" />
          <Skeleton className="h-11 w-full max-w-[11rem] rounded-md" />
        </div>
      </div>
    </div>
  </section>
);