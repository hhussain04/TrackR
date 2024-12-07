import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Toaster } from 'react-hot-toast';
import TaskColumn from './components/TaskColumn';
import AddTaskForm from './components/AddTaskForm';
import ThemeToggle from './components/ThemeToggle';
import Login from './components/Login';
import { useTaskStore } from './store/taskStore';
import { useThemeStore } from './store/themeStore';
import { CATEGORIES } from './utils/constants';
import { Task } from './types/task';

function App() {
  const { tasks, moveTask, saveTasks } = useTaskStore();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [activeTab, setActiveTab] = useState<Task['category']>(CATEGORIES.TODO);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    moveTask(draggableId, destination.droppableId as Task['category']);
  };

  const handleLogin = (userId: string, password: string) => {
    setUserId(userId);
    setPassword(password);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    saveTasks(userId, password);
    setIsLoggedIn(false);
    setUserId('');
    setPassword('');
  };

  const todoTasks = tasks.filter((task) => task.category === CATEGORIES.TODO);
  const inProgressTasks = tasks.filter((task) => task.category === CATEGORIES.IN_PROGRESS);
  const completedTasks = tasks.filter((task) => task.category === CATEGORIES.COMPLETED);

  const tabs = [
    { id: CATEGORIES.TODO, label: 'To Do', count: todoTasks.length },
    { id: CATEGORIES.IN_PROGRESS, label: 'In Progress', count: inProgressTasks.length },
    { id: CATEGORIES.COMPLETED, label: 'Completed', count: completedTasks.length },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <Toaster position="top-right" />
      
      <header className={`transition-colors duration-200 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Task Tracker
          </h1>
          <ThemeToggle />
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <AddTaskForm />
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm
                      transition-colors duration-200 relative
                      ${activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                      }
                    `}
                  >
                    {tab.label}
                    <span className={`
                      ml-2 py-0.5 px-2 rounded-full text-xs
                      ${activeTab === tab.id
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-400'
                      }
                    `}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-1 gap-6 animate-fade-in">
                {activeTab === CATEGORIES.TODO && (
                  <TaskColumn
                    title="To Do"
                    tasks={todoTasks}
                    category={CATEGORIES.TODO}
                  />
                )}
                {activeTab === CATEGORIES.IN_PROGRESS && (
                  <TaskColumn
                    title="In Progress"
                    tasks={inProgressTasks}
                    category={CATEGORIES.IN_PROGRESS}
                  />
                )}
                {activeTab === CATEGORIES.COMPLETED && (
                  <TaskColumn
                    title="Completed"
                    tasks={completedTasks}
                    category={CATEGORIES.COMPLETED}
                  />
                )}
              </div>
            </DragDropContext>
          </>
        )}
      </main>
    </div>
  );
}

export default App;