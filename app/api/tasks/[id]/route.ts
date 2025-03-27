import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server'

import prismadb from '@/lib/prismadb';

// Get a single task
export async function GET(
  req: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params

    const task = await prismadb.task.findUnique({
      where: { 
          id: id, 
          userId 
        },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
  }
}

// Update a task
export async function PUT(
  req: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params

    const { title, color, completed } = await req.json();
    
    const task = await prismadb.task.updateMany({
      where: { 
        id: id, 
        userId 
      },
      data: { 
        title, 
        color, 
        completed 
      },
    });

    if (task.count === 0) {
      return NextResponse.json({ error: "Task not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

// Delete a task
export async function DELETE(
  req: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params

    const task = await prismadb.task.deleteMany({
      where: { 
        id: id, 
        userId 
      },
    });

    if (task.count === 0) {
      return NextResponse.json({ error: "Task not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}