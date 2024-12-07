import React, { useState, useEffect } from 'react';

interface PomodoroTimerProps {
  taskId: string;
  isPomodoroRunning: boolean;
  onPomodoroComplete: (taskId: string) => void;
  onPomodoroToggle: (taskId: string, isRunning: boolean) => void;
  onChangeCategory: (taskId: string, category: 'todo' | 'in-progress' | 'completed') => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  taskId,
  isPomodoroRunning,
  onPomodoroComplete,
  onPomodoroToggle,
  onChangeCategory,
}) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPomodoroRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            onPomodoroComplete(taskId);
            return 25 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPomodoroRunning, taskId, onPomodoroComplete]);

  const togglePomodoro = () => {
    onPomodoroToggle(taskId, !isPomodoroRunning);
  };

  const resetPomodoro = () => {
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg transition-transform duration-200 hover:scale-102">
      <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
        Pomodoro Timer:
      </div>
      <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <button
        onClick={togglePomodoro}
        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 mb-2"
      >
        {isPomodoroRunning ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={resetPomodoro}
        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 mb-2"
      >
        Reset
      </button>
      <div className="flex space-x-2">
        <button
          onClick={() => onChangeCategory(taskId, 'todo')}
          className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
        >
          To Do
        </button>
        <button
          onClick={() => onChangeCategory(taskId, 'in-progress')}
          className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-md hover:bg-yellow-300 transition-colors duration-200"
        >
          In Progress
        </button>
        <button
          onClick={() => onChangeCategory(taskId, 'completed')}
          className="px-2 py-1 bg-green-200 text-green-800 rounded-md hover:bg-green-300 transition-colors duration-200"
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;