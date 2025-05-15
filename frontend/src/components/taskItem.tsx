"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { api_DeleteTask, api_UpdateStatusTask } from "@/api/task";
import { Task } from "@/api/interfaces";
import { useState } from "react";
import { TaskForm } from "./taskForm";

export function TaskItem({
  task,
  onUpdate,
}: {
  task: Task;
  onUpdate?: () => void;
}) {
  const [editMode, setEditMode] = useState(false);

  const priorityColors = {
    low: "bg-green-100 text-green-800 hover:bg-green-100",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    high: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  const statusColors = {
    pending: "bg-blue-100 text-blue-800",
    "in-progress": "bg-purple-100 text-purple-800",
    completed: "bg-green-100 text-gray-800",
  };

  const mutationDelete = useMutation({
    mutationFn: api_DeleteTask,
    onSuccess: (data) => {
      if (data.status == 200) onUpdate?.();
    },
  });

  const mutationsStatus = useMutation({
    mutationFn: api_UpdateStatusTask,
    onSuccess: (data) => {
      if (data.status == 200) onUpdate?.();
    },
  });

  return editMode ? (
    <TaskForm
      initialData={task}
      className="bg-gray-100"
      buttonText="Update task"
      onFinish={() => {
        onUpdate?.();
        setEditMode(false);
      }}
    />
  ) : (
    <Card className="overflow-hidden !rounded-md bg-gray-100">
      <CardContent className="!p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{task.title}</h3>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className={
                priorityColors[task.priority as keyof typeof priorityColors]
              }
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>
            <Badge
              variant="outline"
              className={statusColors[task.status as keyof typeof statusColors]}
            >
              {task.status === "in-progress"
                ? "In Progress"
                : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </Badge>
          </div>
        </div>

        {task.description && (
          <p className="text-muted-foreground text-sm mt-2">
            {task.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex justify-between bg-muted/50 px-4 py-2">
        <div className="flex items-center">
          <span className="text-sm mr-2">Status:</span>
          <Select
            defaultValue={task.status}
            onValueChange={(value) => {
              mutationsStatus.mutate({
                id: task.id,
                status: value,
              });
            }}
          >
            <SelectTrigger className="h-8 w-[130px] bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant={"ghost"} onClick={() => setEditMode(true)}>
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => {
              mutationDelete.mutate(task.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
