"use client";

import { useMemo, useState, useRef } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Star, Download } from "lucide-react";
import { useProjects } from "../hooks/useProjects";
import { ErrorMessage } from "../components/ui/custom";
import { SOCIAL_LOGOS } from "@/constants/socialLogos";
import type { Project } from "@/types";
import { ProjectsSkeleton } from "./loader/project.loader";
import ProjectsGrid from "./ProjectsGrid";
import { formatMetric } from "@/utils/formatMetric";

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    data: allProjects,
    isLoading: loading,
    isError: error,
  } = useProjects();

  const allCategories = useMemo(() => {
    if (!allProjects) return ["All"];
    const unique = Array.from(new Set(allProjects.map((p) => p.category)));
    return ["All", ...unique.sort()];
  }, [allProjects]);

  const projects =
    allProjects?.filter((project) =>
      filter === "All" ? true : project.category === filter
    ) || [];

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedProject(null);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="text-blue-600">Projects</span>
            </h2>
          </div>
          <div className="flex justify-center">
            <ProjectsSkeleton />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="text-blue-600">Projects</span>
            </h2>
          </div>
          <ErrorMessage message="Failed to load projects" />
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="text-blue-600">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore my latest applications, each showcasing different aspects of
            development expertise
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allCategories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className={
                filter === category ? "bg-blue-600 hover:bg-blue-700" : ""
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <ProjectsGrid projects={projects} onSelect={setSelectedProject} />

        {/* Project Modal/Detail View */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
          >
            <div
              ref={modalRef}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">
                    {selectedProject.title}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProject(null)}
                  >
                    ✕
                  </Button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedProject.images[0]}
                      alt={selectedProject.title}
                      className="w-full rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      {selectedProject.long_description}
                    </p>

                    <div>
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {selectedProject.features.map(
                          (feature: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{feature}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Tech Stack:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech_stack.map(
                          (tech: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {tech}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>

                    {/* Conditional Stats in Modal */}
                    {(selectedProject.rating != null &&
                      selectedProject.rating > 0) ||
                    (selectedProject.downloads != null &&
                      selectedProject.downloads > 0) ? (
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pt-2">
                        {selectedProject.rating != null &&
                          selectedProject.rating > 0 && (
                            <div className="flex items-center space-x-1">
                              <Star
                                size={16}
                                fill="currentColor"
                                className="text-yellow-500"
                              />
                              <span className="font-medium">
                                {selectedProject.rating.toFixed(1)} / 5
                              </span>
                            </div>
                          )}
                        {selectedProject.downloads != null &&
                          selectedProject.downloads > 0 && (
                            <div className="flex items-center space-x-1">
                              <Download size={16} />
                              <span className="font-medium">
                                {formatMetric(selectedProject.downloads)}{" "}
                                downloads
                              </span>
                            </div>
                          )}
                      </div>
                    ) : null}

                    {/* Show all GitHub repos in modal */}
                    {selectedProject.github_repos.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Source Code:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.github_repos.map((repo, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(repo.url, "_blank")}
                            >
                              <img
                                src={SOCIAL_LOGOS.GitHub}
                                alt="GitHub"
                                className="w-4 h-4 mr-1"
                              />
                              {repo.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Fixed Action Buttons at Bottom */}
              {(selectedProject.demo_url ||
                selectedProject.github_repos.length > 0) && (
                <div className="p-6 border-t flex gap-4">
                  {selectedProject.demo_url && (
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 flex-1"
                      onClick={() =>
                        window.open(selectedProject.demo_url, "_blank")
                      }
                    >
                      <ExternalLink size={16} className="mr-2" />
                      View Demo
                    </Button>
                  )}
                  {selectedProject.github_repos.length > 0 && (
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() =>
                        window.open(
                          selectedProject.github_repos[0].url,
                          "_blank"
                        )
                      }
                    >
                      <img
                        src={SOCIAL_LOGOS.GitHub}
                        alt="GitHub"
                        className="w-6 h-6 mr-2"
                      />
                      {selectedProject.github_repos.length === 1
                        ? "Source Code"
                        : "Primary Repo"}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
