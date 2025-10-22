"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Star, Download } from "lucide-react";
import { useProjects } from "../hooks/useProjects";
import { LoadingSpinner, ErrorMessage } from "../components/ui/custom";
import { SOCIAL_LOGOS } from "@/constants/socialLogos";
import type { Project } from "@/types";

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");

  // Fetch all projects (no filter param)
  const { data: allProjects, loading, error } = useProjects();

  const allCategories = useMemo(() => {
    if (!allProjects) return ["All"];
    const unique = Array.from(new Set(allProjects.map((p) => p.category)));
    return ["All", ...unique.sort()];
  }, [allProjects]);

  const projects =
    allProjects?.filter((project) =>
      filter === "All" ? true : project.category === filter
    ) || [];

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
            <LoadingSpinner size="lg" />
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project) => (
            <Card
              className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-blue-200 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <CardHeader className="pb-4">
                <div className="relative">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <Badge
                    variant="secondary"
                    className={`absolute top-2 right-2 ${
                      project.status === "Live"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {project.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack
                      .slice(0, 3)
                      .map((tech: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    {project.tech_stack.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tech_stack.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star
                          size={14}
                          fill="currentColor"
                          className="text-yellow-500"
                        />
                        <span>4.{Math.floor(Math.random() * 5) + 3}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download size={14} />
                        <span>{Math.floor(Math.random() * 50) + 10}K</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.demo_url, "_blank");
                      }}
                    >
                      <ExternalLink size={14} className="mr-2" />
                      Demo
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github_repos[0]?.url, "_blank");
                      }}
                    >
                      <img
                        src={SOCIAL_LOGOS.GitHub}
                        alt="GitHub"
                        className="w-6 h-6 mr-2"
                      />
                      Code
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Modal/Detail View */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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

              <div className="p-6 space-y-6">
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
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() =>
                      window.open(selectedProject.demo_url, "_blank")
                    }
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View Demo
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      window.open(
                        selectedProject.github_repos[0]?.url,
                        "_blank"
                      )
                    }
                  >
                    <img
                      src={SOCIAL_LOGOS.GitHub}
                      alt="GitHub"
                      className="w-6 h-6 mr-2"
                    />
                    Source Code
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
