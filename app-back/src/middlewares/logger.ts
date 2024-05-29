import type { NextFunction, Request, Response } from "express";

export function loggerHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const ip = req.ip;
  const method = req.method;
  const url = req.url;
  const version = req.httpVersion;
  const userAgent = req.headers["user-agent"];

  const message = `${ip} [${method}] ${url} HTTP/${version} ${userAgent}`;
  console.log(message);

  next();
}
