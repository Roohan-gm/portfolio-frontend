import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Smartphone,
  Database,
  Settings,
  Zap,
  GitBranch,
  Palette,
  Cloud,
} from "lucide-react";
import { useSkills } from "../hooks/useSkills";
import { LoadingSpinner, ErrorMessage } from "../components/ui/custom";
import { useDeveloperInfo } from "@/hooks/useDeveloperInfo";
import { formatMetric } from "@/utils/formatMetric";

const Skills = () => {
  const { data: skills, loading: skillsLoading, error } = useSkills();
  const { data: developer, loading: devLoading } = useDeveloperInfo();

  // ✅ Check both loading states
  if (skillsLoading || devLoading) {
    return (
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skills & <span className="text-blue-600">Expertise</span>
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
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skills & <span className="text-blue-600">Expertise</span>
            </h2>
          </div>
          <ErrorMessage message="Failed to load skills" />
        </div>
      </section>
    );
  }

  // Group skills by category dynamically
  const groupedSkills =
    skills?.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill.name);
      return acc;
    }, {} as Record<string, string[]>) || {};

  // Map categories to UI config
  const categoryConfig = [
    {
      key: "mobile",
      title: "Mobile Development",
      icon: <Smartphone className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-50 border-blue-200",
    },
    {
      key: "backend",
      title: "Backend & Database",
      icon: <Database className="w-6 h-6 text-green-600" />,
      color: "bg-green-50 border-green-200",
    },
    {
      key: "tools",
      title: "Tools & Workflow",
      icon: <Settings className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50 border-purple-200",
    },
    {
      key: "frontend",
      title: "Frontend Development",
      icon: <Palette className="w-6 h-6 text-red-600" />,
      color: "bg-red-50 border-red-200",
    },
  ];

  const expertiseAreas = [
    {
      name: "React Native Development",
      level: 95,
      description:
        "Cross-platform mobile app development with native performance",
    },
    {
      name: "JavaScript/TypeScript",
      level: 90,
      description:
        "Modern ES6+ features and TypeScript for type-safe development",
    },
    {
      name: "Mobile UI/UX",
      level: 85,
      description: "Creating intuitive and responsive mobile user interfaces",
    },
    {
      name: "API Integration",
      level: 88,
      description: "RESTful APIs, GraphQL, and real-time data synchronization",
    },
    {
      name: "Performance Optimization",
      level: 82,
      description: "App performance tuning and memory management",
    },
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Skills & <span className="text-blue-600">Expertise</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive toolkit for building modern web and mobile
            applications with cutting-edge technologies
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {categoryConfig.map((config) => {
            const skillsInCategory = groupedSkills[config.key] || [];
            if (skillsInCategory.length === 0) return null;

            return (
              <Card
                key={config.key}
                className={`${config.color} hover:shadow-lg transition-shadow`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    {config.icon}
                    <span>{config.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillsInCategory.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-white/70 text-gray-700 hover:bg-white transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Expertise Levels */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Core Expertise
            </h3>
            {expertiseAreas.map((expertise, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">
                    {expertise.name}
                  </h4>
                  <span className="text-sm font-medium text-gray-600">
                    {expertise.level}%
                  </span>
                </div>
                <Progress value={expertise.level} className="h-2 bg-gray-200" />
                <p className="text-sm text-gray-600">{expertise.description}</p>
              </div>
            ))}
          </div>

          {/* Technical Highlights */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-lg p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-bold">Performance First</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Optimized apps with 60 FPS animations, efficient memory usage,
                and fast startup times.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-yellow-400 font-semibold">
                    Bundle Size
                  </div>
                  <div className="text-gray-300">Reduced by 40%</div>
                </div>
                <div>
                  <div className="text-yellow-400 font-semibold">Load Time</div>
                  <div className="text-gray-300">Under 3 seconds</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center p-6">
                <GitBranch className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900">CI/CD Expert</h4>
                <p className="text-sm text-gray-600 mt-2">
                  Automated testing and deployment pipelines
                </p>
              </Card>

              <Card className="text-center p-6">
                <Cloud className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900">Cloud Native</h4>
                <p className="text-sm text-gray-600 mt-2">
                  Scalable backend integration and deployment
                </p>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-100">
              <div className="flex items-center space-x-3 mb-3">
                <Palette className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Design Systems</h4>
              </div>
              <p className="text-gray-700 text-sm">
                Creating consistent, reusable UI components with accessibility
                in mind. Proficient in design-to-code workflows using Figma.
              </p>
            </div>
          </div>
        </div>

        {/* Certification/Stats */}
        {developer?.stats && (
          <div className="mt-16 bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400">
                  {developer.stats.yearsExperience}+
                </div>
                <div className="text-gray-300 text-sm">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">
                  {developer.stats.productsShipped}
                </div>
                <div className="text-gray-300 text-sm">Products Shipped</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">
                  {formatMetric(developer.stats.activeUsers)}+
                </div>
                <div className="text-gray-300 text-sm">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">
                  {developer.stats.averageRating}★
                </div>
                <div className="text-gray-300 text-sm">Average Rating</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
