import { create } from 'zustand';
import { Task } from '../types/task';
import { loadFromStorage, saveToStorage, STORAGE_KEY } from '../utils/storage';
import CryptoJS from 'crypto-js';

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, category: Task['category']) => void;
  loadTasks: (userId: string, password: string) => void;
  saveTasks: (userId: string, password: string) => void;
}

const initialTasks: Task[] = [];

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: initialTasks,
  addTask: (task) =>
    set((state) => {
      const newTasks = [
        ...state.tasks,
        {
          ...task,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
      ];
      return { tasks: newTasks };
    }),
  updateTask: (id, updates) =>
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      );
      return { tasks: newTasks };
    }),
  deleteTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.filter((task) => task.id !== id);
      return { tasks: newTasks };
    }),
  moveTask: (taskId, category) =>
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, category } : task
      );
      return { tasks: newTasks };
    }),
  loadTasks: (userId, password) => {
    const encryptedTasks = loadFromStorage<string>(`${STORAGE_KEY}-${userId}`);
    if (encryptedTasks) {
      const bytes = CryptoJS.AES.decrypt(encryptedTasks, password);
      const decryptedTasks = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      set({ tasks: decryptedTasks });
    }
  },
  saveTasks: (userId, password) => {
    const tasks = get().tasks;
    const encryptedTasks = CryptoJS.AES.encrypt(JSON.stringify(tasks), password).toString();
    saveToStorage(`${STORAGE_KEY}-${userId}`, encryptedTasks);
  },
}));