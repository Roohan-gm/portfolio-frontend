import { useInView, animated } from "@react-spring/web";
import { Library, Database, Hammer, Languages, Workflow } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Skill = { category: string; name: string };

/* ---- config ---- */
const categoryConfig = [
  {
    key: "Frameworks/Libraries",
    title: "Frameworks / Libraries",
    icon: <Library className="w-6 h-6 text-blue-600" />,
    color: "bg-blue-50 border-blue-200",
  },
  {
    key: "Database",
    title: "Database",
    icon: <Database className="w-6 h-6 text-green-600" />,
    color: "bg-green-50 border-green-200",
  },
  {
    key: "Developer Tools",
    title: "Developer Tools",
    icon: <Hammer className="w-6 h-6 text-purple-600" />,
    color: "bg-purple-50 border-purple-200",
  },
  {
    key: "Languages",
    title: "Languages",
    icon: <Languages className="w-6 h-6 text-yellow-600" />,
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    key: "Devops",
    title: "Devops",
    icon: <Workflow className="w-6 h-6 text-red-600" />,
    color: "bg-red-50 border-red-200",
  },
];

/* ---- single category card ---- */
const AnimatedCategoryCard = ({
  config,
  skills,
}: {
  config: (typeof categoryConfig)[0];
  skills: string[];
}) => {
  const [cardRef, cardSpring] = useInView(
    () => ({
      from: { opacity: 0, y: 40, scale: 0.96 },
      to: { opacity: 1, y: 0, scale: 1 },
      config: { tension: 220, friction: 30 },
    }),
    { rootMargin: "-20% 0%", once: true }
  );

  return (
    <animated.div ref={cardRef} style={cardSpring}>
      <Card className={`${config.color} hover:shadow-lg transition-shadow`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            {config.icon}
            <span>{config.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <AnimatedBadge key={skill} skill={skill} delay={i * 40} />
            ))}
          </div>
        </CardContent>
      </Card>
    </animated.div>
  );
};

/* ---- individual badge ---- */
const AnimatedBadge = ({ skill, delay }: { skill: string; delay: number }) => {
  const [ref, springs] = useInView(
    () => ({
      from: { opacity: 0, scale: 0.8 },
      to: { opacity: 1, scale: 1 },
      delay,
      config: { tension: 300, friction: 25 },
    }),
    { rootMargin: "-20% 0%"}
  );

  return (
    <animated.div ref={ref} style={springs}>
      <Badge
        variant="secondary"
        className="bg-white/70 text-gray-700 hover:bg-white transition-colors"
      >
        {skill}
      </Badge>
    </animated.div>
  );
};

/* ---- main component ---- */
export default function AnimatedSkillCategories({
  skills,
}: {
  skills: Skill[];
}) {
  const groupedSkills =
    skills?.reduce((acc, s) => {
      acc[s.category] = acc[s.category] || [];
      acc[s.category].push(s.name);
      return acc;
    }, {} as Record<string, string[]>) || {};

  return (
    <div className="grid lg:grid-cols-3 gap-8 mb-16">
      {categoryConfig.map((cfg) => {
        const list = groupedSkills[cfg.key] || [];
        if (list.length === 0) return null;
        return (
          <AnimatedCategoryCard key={cfg.key} config={cfg} skills={list} />
        );
      })}
    </div>
  );
}
