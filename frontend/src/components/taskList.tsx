"use client";

import { useState } from "react";
import { TaskItem } from "@/components/taskItem";
import { TaskForm } from "@/components/taskForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Task } from "@/api/interfaces";

export function TaskList({
  tasks,
  onUpdate,
}: {
  tasks: Task[];
  onUpdate?: () => void;
}) {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <Card>
      <CardContent className="pt-5">
        <Tabs defaultValue="all" className="mb-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {tasks.filter((x) => {
            if (activeTab == "all") return true;
            return x.status == activeTab;
          }).length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No tasks found
            </p>
          ) : (
            tasks
              .filter((x) => {
                if (activeTab == "all") return true;
                return x.status == activeTab;
              })
              .map((task) => (
                <div key={task.id}>
                  <TaskItem task={task} onUpdate={() => onUpdate?.()} />
                </div>
              ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
