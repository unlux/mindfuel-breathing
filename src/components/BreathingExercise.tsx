import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { BreathingAnimation } from './BreathingAnimation';
import { Timer } from './Timer';

type BreathingExerciseProps = {
  duration: number;
  onComplete: () => void;
  onStop: () => void;
};

export function BreathingExercise({ duration, onComplete, onStop }: BreathingExerciseProps) {
  const [remainingTime, setRemainingTime] = useState(duration);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  const vibrate = useCallback((pattern: number[]) => {
    if ('vibrate' in navigator) {
      try {
        // Use a simple vibration for Firefox
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
          navigator.vibrate(200);
        } else {
          navigator.vibrate(pattern);
        }
      } catch (error) {
        console.error('Vibration failed:', error);
        // Fallback to a simple vibration if the pattern doesn't work
        try {
          navigator.vibrate(200);
        } catch (fallbackError) {
          console.error('Fallback vibration failed:', fallbackError);
        }
      }
    } else {
      console.log('Vibration not supported on this device');
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          toast.success('Breathing exercise completed!', {
            icon: '🧘',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
          onComplete();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setPhase((prevPhase) => {
        switch (prevPhase) {
          case 'inhale':
            vibrate([200, 100, 200]);
            return 'hold';
          case 'hold':
            vibrate([200, 100, 200, 100, 200]);
            return 'exhale';
          case 'exhale':
            vibrate([400]);
            return 'inhale';
          default:
            return 'inhale';
        }
      });
    }, phase === 'hold' ? 2000 : 4000);

    return () => clearInterval(phaseTimer);
  }, [phase, vibrate]);

  return (
    <motion.div 
      className="flex flex-col items-center space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Timer remainingTime={remainingTime} />
      <BreathingAnimation phase={phase} />
      <motion.div 
        className="text-3xl font-light text-gray-100 capitalize"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={phase}
      >
        {phase}
      </motion.div>
      <motion.button
        onClick={onStop}
        className="px-6 py-2 text-lg text-gray-900 bg-red-400 rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Stop Exercise
      </motion.button>
    </motion.div>
  );
}

