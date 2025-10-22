import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  MapPin,
  Calendar,
  Award,
  Users,
  Coffee,
  Heart,
  Download,
  ExternalLink,
} from "lucide-react";
import { useExperiences } from "../hooks/useExperiences";
import { useDeveloperInfo } from "../hooks/useDeveloperInfo";
import { useTestimonials } from "../hooks/useTestimonials";
import { LoadingSpinner, ErrorMessage } from "../components/ui/custom";
import type { Testimonial } from "@/types";
const About = () => {
  const {
    data: developerInfo,
    loading: devLoading,
    error: devError,
  } = useDeveloperInfo();
  const {
    data: experience,
    loading: expLoading,
    error: expError,
  } = useExperiences();
  const {
    data: testimonials,
    loading: testLoading,
    error: testError,
  } = useTestimonials();

  const getSocialUrl = (platform: string) => {
    return (
      developerInfo?.social.find((link) => link.name === platform)?.url || ""
    );
  };

  if (devLoading || expLoading || testLoading) {
    return (
      <section id="about" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About <span className="text-blue-600">Me</span>
            </h2>
          </div>
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  if (devError || expError || testError) {
    return (
      <section id="about" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About <span className="text-blue-600">Me</span>
            </h2>
          </div>
          <ErrorMessage message="Failed to load about information" />
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About <span className="text-blue-600">Me</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get to know the developer behind the code - my journey, passion, and
            what drives me to create exceptional mobile experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Personal Info & Story */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Card */}
            <Card className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 ">
                  <img
                    src={developerInfo?.avatar}
                    alt={developerInfo?.name}
                    className="w-32 h-32 rounded-2xl object-cover shadow-lg bg-blue-900/40"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {developerInfo?.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-4">
                      {developerInfo?.title}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {developerInfo?.bio}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} />
                      <span>{developerInfo?.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>Available for projects</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    {developerInfo?.resumeUrl && (
                      <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <a href={developerInfo.resumeUrl} download>
                          <Download size={16} className="mr-2" />
                          Download Resume
                        </a>
                      </Button>
                    )}

                    {getSocialUrl("portfolio") && (
                      <Button variant="outline" asChild>
                        <a
                          href={getSocialUrl("portfolio")}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={16} className="mr-2" />
                          View Portfolio
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Experience Timeline */}
            <Card className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="mr-3 text-blue-600" />
                Professional Experience
              </h3>
              <div className="space-y-6">
                {experience?.map((exp, index) => (
                  <div key={exp._id} className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                        {index < experience.length - 1 && (
                          <div className="w-0.5 h-16 bg-gray-200 ml-1 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {exp.title}
                          </h4>
                          <p className="text-blue-600 font-medium">
                            {exp.company}
                          </p>
                          <p className="text-sm text-gray-500">{exp.period}</p>
                        </div>
                        <p className="text-gray-700">{exp.description}</p>
                        <ul className="space-y-1">
                          {exp.achievements?.map(
                            (achievement, achievementIndex) => (
                              <li
                                key={achievementIndex}
                                className="text-sm text-gray-600 flex items-start space-x-2"
                              >
                                <span className="text-blue-600 mt-1">•</span>
                                <span>{achievement}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Personal Interests */}
            <Card className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Heart className="mr-3 text-red-500" />
                Beyond Code
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">
                    Interests & Hobbies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Open Source",
                      "Tech Blogging",
                      "Photography",
                      "Travel",
                      "Gaming",
                      "Fitness",
                    ].map((interest, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Fun Facts</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <Coffee size={14} className="text-brown-500" />
                      <span>Powered by coffee and curiosity</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Users size={14} className="text-blue-500" />
                      <span>Mentored 10+ junior developers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Award size={14} className="text-yellow-500" />
                      <span>React Native community contributor</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar - Testimonials */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              What People Say
            </h3>
            {testimonials?.map((testimonial: Testimonial) => (
              <Card
                key={testimonial._id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="space-y-4">
                    <p className="text-gray-700 text-sm leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {testimonial.title}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Contact Info Summary */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-4">
                Let's Connect
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3 text-gray-700">
                  <span className="font-medium">Email:</span>
                  <a
                    href={`mailto:${developerInfo?.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {developerInfo?.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <span className="font-medium">Location:</span>
                  <span>{developerInfo?.location}</span>
                </div>
                <div className="text-gray-600 text-xs mt-3">
                  Available for freelance projects and full-time opportunities
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
