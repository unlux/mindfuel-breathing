import { useState } from 'react';
import { motion } from 'framer-motion';

type SettingsProps = {
  onStart: (duration: number) => void;
};

export function Settings({ onStart }: SettingsProps) {
  const [duration, setDuration] = useState(5);

  return (
    <motion.div 
      className="flex flex-col items-center space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <select
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        className="px-4 py-2 text-lg bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
      >
        {[1, 2, 3, 5, 10, 15, 20].map((value) => (
          <option key={value} value={value}>
            {value} minute{value > 1 ? 's' : ''}
          </option>
        ))}
      </select>
      <motion.button
        onClick={() => onStart(duration * 60)}
        className="px-6 py-2 text-lg text-gray-900 bg-gradient-to-r from-blue-400 to-teal-400 rounded-md shadow-md hover:from-blue-500 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start Breathing
      </motion.button>
    </motion.div>
  );
}

