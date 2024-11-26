import { motion } from 'framer-motion';

type BreathingAnimationProps = {
  phase: 'inhale' | 'hold' | 'exhale';
};

export function BreathingAnimation({ phase }: BreathingAnimationProps) {
  const variants = {
    inhale: { 
      scale: 1.3, 
      opacity: 0.8,
      backgroundColor: '#60A5FA', // blue-400
      transition: { duration: 4, ease: 'easeInOut' } 
    },
    hold: { 
      scale: 1.3, 
      opacity: 1,
      backgroundColor: '#34D399', // green-400
      transition: { duration: 2, ease: 'easeInOut' } 
    },
    exhale: { 
      scale: 1, 
      opacity: 0.6,
      backgroundColor: '#FBBF24', // yellow-400
      transition: { duration: 4, ease: 'easeInOut' } 
    },
  };

  return (
    <div className="relative flex items-center justify-center h-48 w-48">
      <motion.div
        className="absolute w-full h-full rounded-full filter blur-md"
        animate={phase}
        variants={variants}
      />
      <motion.div
        className="absolute w-3/4 h-3/4 rounded-full bg-white opacity-30 mix-blend-overlay"
        animate={phase}
        variants={variants}
      />
    </div>
  );
}

