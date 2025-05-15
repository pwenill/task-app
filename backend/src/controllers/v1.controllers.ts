import { Request, Response } from "express";
import { v4 as uuidv4, v4 } from "uuid";
import dotenv from "dotenv";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

//#region Models

import Tasks from "../models/Tasks";
import { TaskValidator } from "../libs/taskValidator";

//#endregion

dotenv.config();

export const createTask = async (req: Request, res: Response) => {
  try {
    const validator = await TaskValidator().parseAsync(req.body);

    const newTask = new Tasks({
      id: uuidv4(),
      title: validator.title,
      description: validator.description,
      status: validator.status,
      priority: validator.priority,
    });
    await newTask.save();

    return res.status(StatusCodes.OK).json({ message: true });
  } catch (error: any) {
    if (error.name == "ZodError")
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.errors.map((e: any) => {
          return { message: e.message, path: e.path.join(".") };
        }),
      });

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Tasks.findOne({ id: req.params.id });
    if (!task)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Task not found" });

    await task.deleteOne();

    return res.status(StatusCodes.OK).json({ message: true });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const validator = await TaskValidator().parseAsync(req.body);

    const task = await Tasks.findOne({ id: req.params.id });
    if (!task)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Task not found" });

    await Tasks.findOneAndUpdate(
      {
        id: req.params.id,
      },
      {
        $set: {
          title: validator.title,
          description: validator.description,
          status: validator.status,
          priority: validator.priority,
        },
      }
    );

    return res.status(StatusCodes.OK).json({ message: true });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};

export const changeStatusTask = async (req: Request, res: Response) => {
  try {
    const task = await Tasks.findOne({ id: req.params.id });
    if (!task)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Task not found" });

    await Tasks.findOneAndUpdate(
      {
        id: req.params.id,
      },
      {
        $set: {
          status: req.body.status,
        },
      }
    );

    return res.status(StatusCodes.OK).json({ message: true });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};

export const tasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Tasks.find();

    return res.status(StatusCodes.OK).json({
      lists: tasks.map((task) => {
        return {
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
        };
      }),
    });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
