'use client'

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Settings } from '../components/Settings';
import { BreathingExercise } from '../components/BreathingExercise';
import { motion } from 'framer-motion';

export default function Home() {
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);
  const [duration, setDuration] = useState(0);

  const handleStart = (selectedDuration: number) => {
    setDuration(selectedDuration);
    setIsExerciseStarted(true);
  };

  const handleComplete = () => {
    setIsExerciseStarted(false);
  };

  const handleStop = () => {
    setIsExerciseStarted(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg shadow-2xl"
      >
        <h1 className="mb-8 text-4xl font-light text-center text-gray-100">Mindful Breathing</h1>
        {isExerciseStarted ? (
          <BreathingExercise duration={duration} onComplete={handleComplete} onStop={handleStop} />
        ) : (
          <Settings onStart={handleStart} />
        )}
      </motion.main>
    </div>
  );
}

