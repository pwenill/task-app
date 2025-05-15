"use client";

import type React from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api_ManageTask } from "@/api/task";
import { Task } from "@/api/interfaces";

interface TaskFormProps {
  initialData?: Task;
  buttonText?: string;
  className?: string;
  onFinish?: () => void;
}

export function TaskForm({
  className,
  initialData,
  buttonText = "Add Task",
  onFinish,
}: TaskFormProps) {
  const schemaValidator = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    status: z.string().min(1),
    priority: z.string().min(1),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schemaValidator),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      status: initialData?.status ?? "",
      priority: initialData?.priority ?? "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        status: initialData.status,
        priority: initialData.priority,
      });
    }
  }, [initialData, reset]);

  const mutations = useMutation({
    mutationFn: api_ManageTask,
    onSuccess: (data) => {
      if (data.status == 200) {
        onFinish?.();
        reset();
      }
    },
  });

  const onSubmit = (data: any) => {
    const validator = schemaValidator.safeParse(data);

    if (!validator.success) return;

    mutations.mutate({
      ...data,
      ...(initialData ? { id: initialData.id } : null),
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          {buttonText === "Add Task" ? "Create New Task" : "Edit Task"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input placeholder="Task title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              placeholder="Task description"
              rows={3}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                onValueChange={(value) => setValue("status", value)}
                defaultValue={initialData?.status ?? ""}
              >
                <SelectTrigger id="status" className="bg-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                onValueChange={(value) => setValue("priority", value)}
                defaultValue={initialData?.priority ?? ""}
              >
                <SelectTrigger id="priority" className="bg-white">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              {errors.priority && (
                <p className="text-red-500 text-sm">
                  {errors.priority.message}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full">
            {buttonText}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
