import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number; // total duration in ms
  delay?: number; // delay before starting in ms
}

export default function AnimatedCounter({ target, suffix = '', duration = 1200, delay = 100 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let timerId: number;

    const startAnimation = () => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        
        // Progress ratio clamped between 0 and 1
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function: easeOutQuad, starts fast then slows down
        const easeProgress = progress * (2 - progress);
        
        const currentCount = Math.floor(easeProgress * target);
        setCount(currentCount);

        if (progress < 1) {
          timerId = requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };
      
      timerId = requestAnimationFrame(step);
    };

    const delayTimer = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(timerId);
    };
  }, [target, duration, delay]);

  return (
    <motion.span
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: [0.9, 1.15, 1], opacity: 1 }}
      transition={{ 
        duration: 0.6, 
        ease: 'easeOut',
        delay: delay / 1000 
      }}
      className="inline-block"
    >
      {count}
      <span className="text-primary-container font-extrabold ml-0.5">{suffix}</span>
    </motion.span>
  );
}
