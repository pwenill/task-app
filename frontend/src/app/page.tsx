"use client";

import { TaskList } from "@/components/taskList";
import { TaskForm } from "@/components/taskForm";
import { api_Tasks } from "@/api/task";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: api_Tasks,
  });

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Task Manager</h1>
      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <div>
          <TaskForm onFinish={() => refetch()} />
        </div>
        <div>
          <TaskList
            tasks={data?.status == 200 ? data?.data.lists : []}
            onUpdate={() => refetch()}
          />
        </div>
      </div>
    </main>
  );
}
