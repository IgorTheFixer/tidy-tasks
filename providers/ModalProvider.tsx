'use client'

import { useEffect, useState } from "react"
import DeleteTaskModal from "@/components/ui/delete-task-modal";

export const ModalProvider = () =>{
  //Prevents bad hydration of component
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null
  }

  return(
    <>
      <DeleteTaskModal />
    </>
  )
}