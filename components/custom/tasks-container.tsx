import { useTaskStore } from "@/hooks/useTaskStore";
import { useEffect, useState } from 'react' 
import TaskCard from "@/components/custom/task-card";
import { ReactSortable } from "react-sortablejs";
import { Task } from "@/types";

export const TasksContainer = () => {
  const { tasks, loading, fetchTasks, setTasks } = useTaskStore();

  useEffect(() => {
    if (tasks.length === 0) fetchTasks();
  }, [tasks.length, fetchTasks]);

  const handleUpdateTasks = (newTasks:Task[]) => {
    setTasks(newTasks); 
  };

  return(
    <div className="
      flex 
      flex-col 
      border-[#333333] 
      border-t 
      rounded-xl 
      my-6 
      text-white 
      justify-center 
      items-center
    ">
      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <>
          <img src="Clipboard.svg" alt="an icon representing a clipboard" className="pt-10 pb-4"/>
          <p className="text-customGray font-bold">You don't have any tasks registered yet.</p>
          <p className="text-customGray pt-4">Create tasks and organize your to-do items</p>
        </>
      ) : (
        <ReactSortable className="w-full h-full" list={tasks} setList={handleUpdateTasks}>
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
              />
            ))}
        </ReactSortable>
      )}
    </div>
  )
}