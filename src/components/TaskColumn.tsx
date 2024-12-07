import React, { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { Task } from '../types/task';
import { useThemeStore } from '../store/themeStore';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  category: Task['category'];
}

const TaskColumn = memo<TaskColumnProps>(({ title, tasks, category }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className={`flex flex-col w-full rounded-lg p-4 transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      <h2 className={`text-xl font-semibold mb-4 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h2>
      <Droppable droppableId={category}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 min-h-[200px]"
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
});

TaskColumn.displayName = 'TaskColumn';

export default TaskColumn;