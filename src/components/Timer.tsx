import { motion } from 'framer-motion';

type TimerProps = {
  remainingTime: number;
};

export function Timer({ remainingTime }: TimerProps) {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <motion.div 
      className="text-5xl font-light text-gray-100"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </motion.div>
  );
}

