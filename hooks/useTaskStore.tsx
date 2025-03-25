import { create } from "zustand"
// import { persist, createJSONStorage } from "zustand/middleware"; 
import axios from "axios"
import { Task } from "@/types";
import toast from "react-hot-toast";

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: ( taskId: string ) => void;
  fetchTasks: () => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
  setTasks: (tasks: Task[]) => void; 
}

export const useTaskStore = create
  <TaskStore>(( set, get) =>({
    tasks: [],
    loading: true,
    setTasks: (tasks) => set({ tasks }),
    addTask: (newTask) => {
      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));
    },
    updateTask: (updatedTask) => {
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        ),
      }));
    },
    deleteTask: async ( taskId: string ) => {
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }));

      try {
        await axios.delete(`/api/tasks/${taskId}`);
      } catch (error) {
        console.error("Failed to delete task", error);
        set((state) => ({ tasks: [...state.tasks, get().tasks.find((task) => task.id === taskId)!] })); // Re-add on failure
      }
    },
    fetchTasks: async() => {
      try {
        const response = await axios.get('/api/tasks')
        console.log(response)
        set({ tasks: response.data, loading: false });
      } catch (error) {
        console.log("Failed to load tasks")
        set({ loading: false });
      }  
    },
    getTaskById: (id) => {
      return get().tasks.find((task) => task.id === id);
    },
    })
)