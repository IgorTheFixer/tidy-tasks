'use client'
import { CreateButton } from "@/components/custom/create-button";
import { TasksContainer } from "@/components/custom/tasks-container";
import { TasksTracker } from "@/components/custom/tasks-tracker";

export default function Home() {
  return (
    <div className="relative">
      <CreateButton />
      <div className="flex flex-col absolute mt-28 w-full">
        <TasksTracker />
        <TasksContainer />       
      </div>
    </div>
  );
}