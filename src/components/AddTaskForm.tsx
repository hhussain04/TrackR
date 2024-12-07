import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import { useThemeStore } from '../store/themeStore';
import { Task } from '../types/task';

const AddTaskForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');

  const addTask = useTaskStore((state) => state.addTask);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addTask({
      title,
      description,
      priority,
      dueDate: dueDate || undefined,
      tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      completed: false,
      category: 'todo',
      pomodoroCount: 0,
      isPomodoroRunning: false,
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setTags('');
    setIsOpen(false);
  };

  const formClasses = `
    transition-all duration-200
    ${isDarkMode 
      ? 'bg-gray-800 text-white' 
      : 'bg-white text-gray-900'
    }
  `;

  const inputClasses = `
    w-full px-3 py-2 rounded-md
    transition-colors duration-200
    ${isDarkMode
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
      : 'bg-white border-gray-300 text-gray-900'
    }
    focus:ring-2 focus:ring-blue-500 focus:border-transparent
  `;

  return (
    <div className="mb-6">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg 
            hover:bg-blue-600 transition-colors duration-200"
        >
          <Plus size={20} />
          Add New Task
        </button>
      ) : (
        <form onSubmit={handleSubmit} className={`${formClasses} p-4 rounded-lg shadow-md`}>
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClasses}
              required
            />
          </div>

          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClasses}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Task['priority'])}
                className={inputClasses}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={inputClasses}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className={inputClasses}
              placeholder="work, urgent, feature"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600
                transition-colors duration-200"
            >
              Add Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTaskForm;