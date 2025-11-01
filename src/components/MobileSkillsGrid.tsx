import { useInView, animated } from '@react-spring/web';
import { Zap, Code, Palette, Server } from 'lucide-react';

/* ---------- your data ---------- */
interface Expertise {
  name: string;
  level: number;
  description: string;
}

const expertiseAreas: Expertise[] = [
  {
    name: 'React Native Development',
    level: 95,
    description: 'Cross-platform mobile app development with native performance',
  },
  {
    name: 'JavaScript/TypeScript',
    level: 90,
    description: 'Modern ES6+ features and TypeScript for type-safe development',
  },
  {
    name: 'Mobile UI/UX',
    level: 85,
    description: 'Creating intuitive and responsive mobile user interfaces',
  },
  {
    name: 'API Integration',
    level: 88,
    description: 'RESTful APIs, GraphQL, and real-time data synchronization',
  },
  {
    name: 'Performance Optimization',
    level: 82,
    description: 'App performance tuning and memory management',
  },
];

/* ---------- progress bar (only this animates) ---------- */
interface ProgressProps {
  value: number;
}

const Progress = ({ value }: ProgressProps) => {
  const [ref, springs] = useInView(
    () => ({
      from: { width: '0%' },
      to: { width: `${value}%` },
      config: { tension: 200, friction: 30 },
    }),
    { rootMargin: '-20% 0%', once: true }
  );

  return (
    <div ref={ref} className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <animated.div
        className="h-full bg-blue-950"
        style={springs}
      />
    </div>
  );
};

/* ---------- static expertise item ---------- */
interface AnimatedExpertiseProps {
  expertise: Expertise;
}

const AnimatedExpertise = ({ expertise }: AnimatedExpertiseProps) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h4 className="font-semibold text-gray-900">{expertise.name}</h4>
      <span className="text-sm font-medium text-gray-600">{expertise.level}%</span>
    </div>
    <Progress value={expertise.level} />
    <p className="text-sm text-gray-600">{expertise.description}</p>
  </div>
);

/* ---------- reusable animated card ---------- */
interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedCard = ({ children, delay = 0, ...props }: AnimatedCardProps) => {
  const [ref, springs] = useInView(
    () => ({
      from: { opacity: 0, y: 40, scale: 0.95 },
      to:   { opacity: 1, y: 0, scale: 1 },
      delay,
      config: { tension: 200, friction: 35 },
    }),
    { rootMargin: '-20% 0%', once: true }
  );
  return (
    <animated.div ref={ref} style={springs} {...props}>
      {children}
    </animated.div>
  );
};

/* ---------- main component ---------- */
export default function MobileSkillsGrid() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto p-6">
      {/* LEFT – expertise */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Expertise</h3>
        {expertiseAreas.map((exp) => (
          <AnimatedExpertise key={exp.name} expertise={exp} />
        ))}
      </div>

      {/* RIGHT – highlights */}
      <div className="space-y-6">
        <AnimatedCard>
          <div className="bg-slate-900 rounded-lg p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-bold">Performance First</h3>
            </div>
            <p className="text-gray-300 mb-4">
              60 FPS animations, 30 % smaller bundles, instant reloads.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-yellow-400 font-semibold">Bundle Size</div>
                <div className="text-gray-300">Reduced by 40 %</div>
              </div>
              <div>
                <div className="text-yellow-400 font-semibold">Boot Time</div>
                <div className="text-gray-300">Under 2 s</div>
              </div>
            </div>
          </div>
        </AnimatedCard>

        <div className="grid grid-cols-2 gap-4">
          <AnimatedCard delay={200}>
            <div className="text-center p-6 border rounded-lg bg-white shadow-sm">
              <Code className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">Clean Code</h4>
              <p className="text-sm text-gray-600 mt-2">
                Type-safe, testable, well-documented
              </p>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={400}>
            <div className="text-center p-6 border rounded-lg bg-white shadow-sm">
              <Server className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">Backend Ready</h4>
              <p className="text-sm text-gray-600 mt-2">
                GraphQL, REST, WebSockets, Firebase
              </p>
            </div>
          </AnimatedCard>
        </div>

        <AnimatedCard delay={600}>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100">
            <div className="flex items-center space-x-3 mb-3">
              <Palette className="w-5 h-5 text-indigo-600" />
              <h4 className="font-semibold text-gray-900">Pixel-Perfect UI</h4>
            </div>
            <p className="text-gray-700 text-sm">
              Native-looking screens, adaptive layouts, dark-mode support, and
              smooth gestures out of the box.
            </p>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}