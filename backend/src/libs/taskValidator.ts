import { z } from "zod";

export const TaskValidator = () => {
  return z.object({
    title: z.string(),
    description: z.string(),
    status: z.string(),
    priority: z.string(),
  });
};
