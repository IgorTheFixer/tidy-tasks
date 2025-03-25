import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'; 

export const CreateButton =() => {
  const router = useRouter();
  return(
    <Button 
      onClick={() => router.push(`/create-task`)} 
      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
      variant={"nooro"} 
      size={"nooro"} 
      type="submit"
    >
    Create Task 
    <span>
      <img src="plus.svg" alt="plus icon"/>
    </span>
  </Button>
  )
}