import { useSpring, animated, useInView } from '@react-spring/web';

interface AnimateNumberProps {
  n: number;
  format?: (value: number) => string;
}

export function AnimateNumber({ n, format = (v) => v.toString() }: AnimateNumberProps) {
  const [ref, inView] = useInView({ amount: 0.3});

  const { progress } = useSpring({
    from: { progress: 0 },
    to: { progress: inView ? 1 : 0 },
    reset: !inView,
    immediate: !inView,
    config: { mass: 1, tension: 20, friction: 9 },
  });

  // interpolate 0-1 → 0-n, then pipe through formatter
  const display = progress.to((p) => format(n * p));

  return <animated.span ref={ref}>{display}</animated.span>;
}