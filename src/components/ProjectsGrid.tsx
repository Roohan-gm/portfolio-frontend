"use client";

/* ---------- react-spring ---------- */
import { animated, useSprings, config, useInView } from "@react-spring/web";

/* ---------- ui components ---------- */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ---------- icons ---------- */
import { ExternalLink, Star, Download } from "lucide-react";
import { SOCIAL_LOGOS } from "@/constants/socialLogos";

/* ---------- types & helpers ---------- */
import type { Project } from "@/types";
import { formatMetric } from "@/utils/formatMetric";

/* ======================================================================= */
/*                              COMPONENT                                  */
/* ======================================================================= */

type Props = {
  projects: Project[];
  onSelect: (p: Project) => void;
};

export default function ProjectsGrid({ projects, onSelect }: Props) {
  const [ref, inView] = useInView({
    once: true, // animate only the first time it becomes visible
    amount: 0.25, // 25 % of the card must be visible
  });
  /* 1. springs: one per card */
  const [springs] = useSprings(
    projects.length,
    projects.map((_, i) => ({
      from: { opacity: 0, y: 40 },
      to: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
      delay: i * 60,
      config: config.gentle,
    })),
    [inView]
  );

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {springs.map((style, idx) => {
        const p = projects[idx];
        return (
          <animated.div
            ref={idx === 0 ? ref : undefined}
            style={style}
            key={p._id}
          >
            <Card
              className="group hover:shadow-xl transition-all duration-300   cursor-pointer"
              onClick={() => onSelect(p)}
            >
              {/* ---------- header ---------- */}
              <CardHeader className="pb-4">
                <div className="relative">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <Badge
                    variant="secondary"
                    className={`absolute top-2 right-2 ${
                      p.status === "Live"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {p.status}
                  </Badge>
                </div>

                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors line-clamp-1">
                  {p.title}
                </CardTitle>

                <CardDescription className="text-gray-600">
                  {p.description}
                </CardDescription>
              </CardHeader>

              {/* ---------- content ---------- */}
              <CardContent>
                <div className="space-y-4">
                  {/* tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {p.tech_stack.slice(0, 3).map((t, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                    {p.tech_stack.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{p.tech_stack.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* stats row */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      {p.rating != null && p.rating > 0 && (
                        <div className="flex items-center space-x-1">
                          <Star
                            size={14}
                            fill="currentColor"
                            className="text-yellow-500"
                          />
                          <span>{p.rating.toFixed(1)}</span>
                        </div>
                      )}
                      {p.downloads != null && p.downloads > 0 && (
                        <div className="flex items-center space-x-1">
                          <Download size={14} />
                          <span>{formatMetric(p.downloads)}</span>
                        </div>
                      )}
                    </div>

                    <Badge
                      variant="default"
                      className="text-xs bg-blue-600 text-white"
                    >
                      {p.category}
                    </Badge>
                  </div>

                  {/* action buttons */}
                  {p.demo_url || p.github_repos.length ? (
                    <div className="flex gap-2 pt-2">
                      {p.demo_url && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(p.demo_url, "_blank");
                          }}
                        >
                          <ExternalLink size={14} className="mr-2" />
                          Demo
                        </Button>
                      )}

                      {p.github_repos.length > 0 && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(p.github_repos[0].url, "_blank");
                          }}
                        >
                          <img
                            src={SOCIAL_LOGOS.GitHub}
                            alt="GitHub"
                            className="w-6 h-6 mr-2"
                          />
                          {p.github_repos.length === 1 ? "Code" : "Code+"}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic pt-2">
                      No demo or source available.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </animated.div>
        );
      })}
    </div>
  );
}
