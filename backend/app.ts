import dotenv from "dotenv";

dotenv.config();

import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import v1Route from "./src/routes/v1.routes";
import mongoose from "mongoose";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import cookieParser from "cookie-parser";
import { Server } from "node:http";
import cors from "cors";
import helmet from "helmet";
import crypto from "crypto";

const app: Express = express();
const port = process.env.PORT || 80;
const server = new Server(app);

app.disable("x-powered-by");
app.set("trust proxy", true);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.json(),
  (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError)
      return res
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .json({ message: getReasonPhrase(StatusCodes.METHOD_NOT_ALLOWED) });

    next();
  }
);

app.use(helmet());

app.use(
  cors({
    origin: (origin: any, callback: any) => {
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Content-Type", "application/json");
  next();
});

// Version 1 API Routes
app.use("/", v1Route);

app.get("/", (req, res) => {
  res.redirect(process.env.FRONTEND_URL as string);
});

app.all("*", (req: Request, res: Response) => {
  res.header("Content-Type", "text/plain");
  return res.status(StatusCodes.NOT_FOUND).send("Not found");
});

mongoose
  .connect(process.env.MONGODB as string)
  .then(async () => {
    console.log("[database]: Connected to database");

    server.listen(port, () => {
      console.log(
        "\x1b[32m%s\x1b[0m",
        `[server]: Server is running at http://localhost:${port}`
      );
    });
  })
  .catch((e) => {
    console.log("\x1b[31m%s\x1b[0m", `[database]: ${e.message}`);
  });
