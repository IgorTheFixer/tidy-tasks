import { useTaskStore } from "@/hooks/useTaskStore";

export const TasksTracker = () =>{
  const { tasks } = useTaskStore();
  const completedTasks = tasks.filter((task) => task.completed).length;

  const spanStyle =
  'bg-[#333333] text-white font-normal text-sm ml-2 rounded-full px-2'
  
  return(
    <div className="flex justify-between h-full">
      <p className="text-customBlue font-bold">
        Tasks 
        <span className={spanStyle}>
          {tasks.length}
        </span>
      </p>
      <p className="text-customPurple font-bold">
        Completed
        <span className={spanStyle}>
          {tasks.length > 0 ? `${completedTasks} of ${tasks.length}`: "0"}
        </span>
      </p>
    </div> 
  )
}