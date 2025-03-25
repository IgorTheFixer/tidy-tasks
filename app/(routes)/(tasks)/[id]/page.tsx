"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React, { useCallback, useEffect, useState } from "react";
import axios from 'axios'
import { useParams, useRouter } from "next/navigation";
import { useTaskStore } from "@/hooks/useTaskStore";
import toast from "react-hot-toast";
import { Task } from "@/types";

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required."),
  color: z.string().min(1, "Color is required"),
  // completed: z.boolean().default(false) 
})

type formValues = z.infer<typeof formSchema>

export default function TaskPage() {
  const [task, setTask] = useState<Task | null>(null)
  const params = useParams();
  const router = useRouter();
  console.log(params);
  const taskId = params?.id;

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title || "",
      color: task?.color || "",
    },
  });

  const fetchTask = async() => {
    try {
      if (!taskId) return;
      const response = await axios.get(`api/tasks/${taskId}`)
      setTask(response.data)
    } catch (error) {
      console.log("Failed to load task")
    }
  }

  useEffect(()=>{
    if (taskId) fetchTask();
  },[taskId])

  const resetForm = useCallback(() => {
    if (task) {
      form.reset({
        title: task.title || "",
        color: task.color || "",
      });
    }
  }, [task, form]);;

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const onSubmit = async(data: formValues) => {
    console.log(data)
    try {
      if (task){
        await axios.put(`/api/tasks/${taskId}`, data)
        const updatedTask = { ...task, ...data };
        useTaskStore.getState().updateTask(updatedTask); 
        toast.success("Task Updated!")
      } else {
        const response = await axios.post(`/api/tasks`, data);
        useTaskStore.getState().addTask(response.data);
        toast.success("Task created!")
      }
      router.push("/")
    } catch (error) {
      console.log("failed to submit task")
      toast.error('Task was not saved')
    }
  }

  const titlePlaceholder = 'Ex. Brush your teeth'
  const submitButtonText = task ? 'Save' : 'Add Task'

  const colors = {
    red: "ff3b30",
    orange: "ff9500",
    yellow: "ffcc00",
    green: "34c759",
    blue: "007aff",
    indigo: "5856d6",
    purple: "af52de",
    pink:"ff2d55",
    brown:"a2845e" 
  }

  const colorsValues = Object.values(colors)

  const Colors: React.FC<{ colorsValues: string[] }> = () => {
    return(
      <>
        {colorsValues.map((color, index) =>(
          <FormItem key={index} className="flex items-center space-x-2">
            <FormControl>
              <RadioGroupItem 
                value={color} 
                id={`form-color-${index}`}
                checked={form.watch("color") === color}
                style={{ backgroundColor: `#${color}` }} 
              />
            </FormControl>
          </FormItem>
        ))}
      </>
    )
  }
  console.log(task)
  return (
    <div className="mt-28 w-full h-full">
      <img onClick={() => router.push('/')} className="pb-10" src="arrow-left.svg" alt="arrow icon to return to homepage"/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormLabel className=" text-customBlue font-bold">Title</FormLabel>
                <FormControl>
                  <Input className="bg-[#262626] border-none text-[#F2F2F2] font-light" placeholder={titlePlaceholder} {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-customBlue font-bold">Color</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value} 
                    className="flex flex-wrap pb-8"
                  >
                    <Colors colorsValues={colorsValues} />
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={"nooro"} size={"nooro"} type="submit">
            {submitButtonText} <span>
              <img src={task ? "mdi_check-bold.svg" : "plus.svg"} alt="plus icon"/>
            </span>
          </Button>
        </form>
      </Form>
    </div>
  );
}