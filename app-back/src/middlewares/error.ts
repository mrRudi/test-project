import { PostgresError } from "postgres";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import type { NextFunction, Request, Response } from "express";

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let message = "Internal server error";
  let details: string | undefined;
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  const ip = req.ip;
  const url = req.originalUrl;
  const method = req.method;

  if (error instanceof PostgresError) {
    message = "The DB crashed";
    details = error.detail;
  } else if (error instanceof ZodError) {
    message = "schema fails";
    details = error.message;
    statusCode = StatusCodes.BAD_REQUEST;
  } else if (error instanceof Error) {
    message = error.message;
  }

  console.error(`${ip} [${method}] ${url} - Error: ${message}`);

  return res.status(statusCode).json({
    message,
    details,
  });
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(StatusCodes.NOT_FOUND).json({
    message: "Route not found",
    details: "The route you are trying to access does not exist",
  });
}
