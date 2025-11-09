import { useSkills } from "../hooks/useSkills";
import { ErrorMessage } from "../components/ui/custom";
import { useDeveloperInfo } from "@/hooks/useDeveloperInfo";
import { formatMetric } from "@/utils/formatMetric";
import { SkillsSkeleton } from "./loader/skill.loader";
import { AnimateNumber } from "@/utils/number-animation";
import MobileSkillsGrid from "@/components/MobileSkillsGrid";
import AnimatedSkillCategories from "./AnimatedSkillCategories";
import { useInView } from "@react-spring/web";

const Skills = () => {
  const [ref, inView] = useInView({ once: true });

  const {
    data: skills,
    isLoading: skillsLoading,
    isError: error,
  } = useSkills(inView);
  const { data: developer, isLoading: devLoading } = useDeveloperInfo();

  // Check both loading states
  if (skillsLoading || devLoading && inView) {
    return (
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skills & <span className="text-blue-600">Expertise</span>
            </h2>
          </div>
          <div className="flex justify-center">
            <SkillsSkeleton />
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

  return (
    <section ref={ref} id="skills" className="py-20 bg-white">
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
        <AnimatedSkillCategories skills={skills!} />{/* Expertise Levels */}
        <MobileSkillsGrid />
        {/* Certification/Stats */}
        {developer?.stats && (
          <div className="mt-16 bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400 flex items-center justify-center">
                  <AnimateNumber
                    n={developer?.stats?.yearsExperience ?? 0}
                    format={(val) => val.toFixed(0)}
                  />
                  +
                </div>
                <div className="text-gray-300 text-sm">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">
                  <AnimateNumber
                    n={developer?.stats?.productsShipped ?? 0}
                    format={(val) => val.toFixed(0)}
                  />
                </div>
                <div className="text-gray-300 text-sm">Products Shipped</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 flex items-center justify-center">
                  <AnimateNumber
                    n={developer?.stats?.activeUsers ?? 0}
                    format={formatMetric}
                  />
                  +
                </div>
                <div className="text-gray-300 text-sm">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 flex items-center justify-center">
                  <AnimateNumber
                    n={developer?.stats?.averageRating ?? 0}
                    format={(val) => val.toFixed(1)}
                  />
                  ★
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
