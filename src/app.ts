import express, { ErrorRequestHandler, Application } from "express";
import logger from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";

import authRouter from "./routes/auth";
import { ErrorWithStatus } from "./types/error";

dotenv.config();

const app: Application = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(((err: ErrorWithStatus, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
}) as ErrorRequestHandler);

export default app;
