import React, { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../types/task';
import { Calendar, Tag, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useTaskStore } from '../store/taskStore';
import { useThemeStore } from '../store/themeStore';
import { PRIORITY_COLORS } from '../utils/constants';
import PomodoroTimer from './PomodoroTimer';

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard = memo<TaskCardProps>(({ task, index }) => {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const handlePomodoroComplete = (taskId: string) => {
    updateTask(taskId, { pomodoroCount: task.pomodoroCount + 1 });
  };

  const handlePomodoroToggle = (taskId: string, isRunning: boolean) => {
    updateTask(taskId, { isPomodoroRunning: isRunning });
  };

  const handleChangeCategory = (taskId: string, category: 'todo' | 'in-progress' | 'completed') => {
    updateTask(taskId, { category });
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 rounded-lg shadow-sm mb-3 ${
            isDarkMode 
              ? 'bg-gray-700' 
              : 'bg-white'
          }`}
        >
          <div>
            <div className="flex items-start justify-between">
              <h3 className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {task.title}
              </h3>
            </div>
            
            <p className={`text-sm mt-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
            
            <div className="mt-3 flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded ${PRIORITY_COLORS[task.priority]}`}>
                {task.priority}
              </span>
              
              {task.dueDate && (
                <div className={`flex items-center text-xs ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  <Calendar size={14} className="mr-1" />
                  {format(new Date(task.dueDate), 'MMM d')}
                </div>
              )}
            </div>

            {task.tags.length > 0 && (
              <div className="mt-2 flex items-center gap-1">
                <Tag size={14} className="text-gray-400" />
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2 py-1 rounded ${
                      isDarkMode 
                        ? 'bg-gray-600 text-gray-200' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <button
              onClick={() => deleteTask(task.id)}
              className="mt-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <PomodoroTimer
            taskId={task.id}
            isPomodoroRunning={task.isPomodoroRunning}
            onPomodoroComplete={handlePomodoroComplete}
            onPomodoroToggle={handlePomodoroToggle}
            onChangeCategory={handleChangeCategory}
          />
        </div>
      )}
    </Draggable>
  );
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;