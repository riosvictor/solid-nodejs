import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../swagger-doc.json";
import { AppError } from "./error/AppError";
import { usersRoutes } from "./routes/users.routes";

import "express-async-errors";
import "./database";
import "./shared/container";

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `internal server error - ${err.message}`,
    });
  }
);

export { app };
