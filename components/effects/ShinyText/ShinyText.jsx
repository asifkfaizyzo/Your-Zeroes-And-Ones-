// components/effects/ShinyText/ShinyText.jsx
import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';

const ShinyText = ({
  text,
  disabled = false,
  speed = 2,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = 'left',
  delay = 0,
  loop = true,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);
  const directionRef = useRef(direction === 'left' ? 1 : -1);
  const hasCompletedOnce = useRef(false);

  // FIXED: Both in milliseconds now
  const animationDuration = speed * 1000;      // speed is in seconds -> convert to ms
  const delayDuration = delay * 1000;          // delay is in seconds -> convert to ms

  useAnimationFrame((time) => {
    if (disabled || isPaused || (!loop && isComplete)) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;

    elapsedRef.current += deltaTime;

    if (yoyo) {
      const cycleDuration = animationDuration + delayDuration;
      const fullCycle = cycleDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;

      if (cycleTime < animationDuration) {
        const p = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else if (cycleTime < cycleDuration) {
        progress.set(directionRef.current === 1 ? 100 : 0);
      } else if (cycleTime < cycleDuration + animationDuration) {
        const reverseTime = cycleTime - cycleDuration;
        const p = 100 - (reverseTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        progress.set(directionRef.current === 1 ? 0 : 100);
      }

      if (!loop && elapsedRef.current >= fullCycle && !hasCompletedOnce.current) {
        hasCompletedOnce.current = true;
        setIsComplete(true);
      }
    } else {
      const cycleDuration = animationDuration + delayDuration;
      const cycleTime = loop
        ? elapsedRef.current % cycleDuration
        : Math.min(elapsedRef.current, cycleDuration);

      if (cycleTime < animationDuration) {
        const p = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        progress.set(directionRef.current === 1 ? 100 : 0);

        if (!loop && !hasCompletedOnce.current) {
          hasCompletedOnce.current = true;
          setIsComplete(true);
        }
      }
    }
  });

  useEffect(() => {
    directionRef.current = direction === 'left' ? 1 : -1;
    elapsedRef.current = 0;
    lastTimeRef.current = null;
    hasCompletedOnce.current = false;
    setIsComplete(false);
    progress.set(direction === 'left' ? 0 : 100);
  }, [direction, loop, progress]);

  useEffect(() => {
    if (!disabled) {
      elapsedRef.current = 0;
      lastTimeRef.current = null;
      hasCompletedOnce.current = false;
      setIsComplete(false);
    }
  }, [disabled]);

  const backgroundPosition = useTransform(progress, (p) => `${150 - p * 2}% center`);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientStyle = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ ...gradientStyle, backgroundPosition }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </motion.span>
  );
};

export default ShinyText;