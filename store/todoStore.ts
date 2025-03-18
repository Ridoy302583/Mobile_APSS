import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  loadTodos: () => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (title: string) => {
    set((state) => {
      const newTodos = [
        ...state.todos,
        {
          id: Math.random().toString(36).substring(7),
          title,
          completed: false,
          createdAt: Date.now(),
        },
      ];
      AsyncStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    });
  },
  toggleTodo: (id: string) => {
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      AsyncStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    });
  },
  deleteTodo: (id: string) => {
    set((state) => {
      const newTodos = state.todos.filter((todo) => todo.id !== id);
      AsyncStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    });
  },
  loadTodos: async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos) {
        set({ todos: JSON.parse(storedTodos) });
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  },
}));