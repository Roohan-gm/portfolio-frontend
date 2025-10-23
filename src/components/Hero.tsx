import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  ArrowRight,
  Download,
  MapPin,
  Smartphone,
  Code,
  Zap,
} from "lucide-react";
import { useDeveloperInfo } from "../hooks/useDeveloperInfo";
import { ErrorMessage } from "../components/ui/custom";
import { formatMetric } from "@/utils/formatMetric";

const codeSnippet = `// React Native Performance Optimization
import React, { useMemo, useCallback } from 'react';
import { FlatList, View, Text } from 'react-native';

const OptimizedList = ({ data, onItemPress }) => {
  const renderItem = useCallback(({ item }) => (
    <ListItem 
      item={item} 
      onPress={() => onItemPress(item.id)} 
    />
  ), [onItemPress]);

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
};`;

type HeroProps = {
  onSectionChange: (section: string) => void;
};

const Hero: React.FC<HeroProps> = ({ onSectionChange }) => {
  const {
    data: developerInfo,
    isLoading: loading,
    isError: error,
  } = useDeveloperInfo();

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      onSectionChange("projects");
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      onSectionChange("contact");
    }
  };

  // RENDER CONDITIONALLY WITHIN JSX, NOT VIA EARLY RETURNS
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-slate-900 flex items-center justify-center"
    >
      {loading && (
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-slate-800 rounded w-3/4"></div>
          <div className="h-4 bg-slate-800 rounded w-full"></div>
          <div className="h-4 bg-slate-800 rounded w-5/6"></div>
        </div>
      )}

      {error && <ErrorMessage message="Failed to load developer information" />}

      {!loading && !error && (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-slate-800 text-blue-400 border-blue-500/20"
                >
                  <Zap size={14} className="mr-2" />
                  Available for hire
                </Badge>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Full-Stack
                  </span>
                  <br />
                  <span className="text-gray-100">Developer</span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  {developerInfo?.bio ||
                    "Passionate React Native developer creating amazing mobile experiences."}
                </p>

                <div className="flex items-center space-x-4 text-gray-400">
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>
                      {developerInfo?.location || "San Francisco, CA"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Smartphone size={16} />
                    <span>
                      {developerInfo?.stats.yearsExperience || 1}+ Years
                      Experience
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={scrollToProjects}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white group"
                >
                  View My Work
                  <ArrowRight
                    size={20}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
                {developerInfo?.resumeUrl ? (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-slate-700 hover:text-white hover:bg-slate-800"
                  >
                    <a href={developerInfo.resumeUrl} download>
                      <Download size={20} className="mr-2" />
                      Download Resume
                    </a>
                  </Button>
                ) : (
                  <Button
                    onClick={scrollToContact}
                    variant="outline"
                    size="lg"
                    className="border-slate-700 hover:text-white hover:bg-slate-800"
                  >
                    <Download size={20} className="mr-2" />
                    Contact for Resume
                  </Button>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {developerInfo?.stats?.productsShipped ?? 0}
                  </div>
                  <div className="text-sm text-gray-400">Products Shipped</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {formatMetric(developerInfo?.stats?.activeUsers ?? 0)}+
                  </div>
                  <div className="text-sm text-gray-400">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {developerInfo?.stats?.averageRating ?? 0}★
                  </div>
                  <div className="text-sm text-gray-400">Avg Rating</div>
                </div>
              </div>
            </div>

            {/* Right Column - Code Preview */}
            <div className="relative">
              <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden shadow-2xl">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <Code size={16} />
                    <span>OptimizedList.js</span>
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-4 text-sm font-mono">
                  <pre className="text-gray-300 leading-relaxed">
                    <code>{codeSnippet}</code>
                  </pre>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg animate-pulse">
                <Smartphone className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
