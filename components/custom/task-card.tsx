import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useTaskStore } from "@/hooks/useTaskStore";
import { useModal } from "@/hooks/useModal";
import { useRouter } from 'next/navigation';
import { Task } from "@/types";


const TaskCard = ({ task }:{ task:Task }) => {
  const { onOpen } = useModal();
  const { updateTask } = useTaskStore();
  const router = useRouter();

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateTask({ ...task, completed: !task.completed }); 
  };

  return(
    <Card onClick={() => router.push(`/${task.id}`)} className="text-white bg-[#262626] border-[#333333] flex justify-between items-center p-4 w-full h-full">
      <div className="flex justify-center items center">
        <Checkbox 
          className="flex justify-center items center rounded-full mt-1"
          onClick={handleCheckboxClick}
        />
        <CardContent 
          className={`pl-4 transition-all duration-300 ${task.completed ? "line-through opacity-50" : ""}`}
        >
          <p>{task.title}</p>
        </CardContent>
      </div>
      <CardFooter>
        <img 
          src="trash.svg" 
          alt="an icon representing a trashcan"
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onOpen("deleteTask", task.id);
          }}
        />
      </CardFooter>
    </Card>
  )
}

export default TaskCard