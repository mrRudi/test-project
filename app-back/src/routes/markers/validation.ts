import { z, ZodError, type ZodObject } from "zod";
import { StatusCodes } from "http-status-codes";
import type { Request, Response, NextFunction } from "express";

export function validateData(schema: ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid data", details: errorMessages });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  };
}

export const createMarkerSchema = z.object({
  body: z.object({
    description: z.string(),
    lat: z.number(),
    lng: z.number(),
  }),
});

export const findMarkersSchema = z.object({
  query: z.object({
    offset: z
      .string()
      .transform((val) => Number(val))
      .pipe(z.number().min(0)),
    limit: z
      .string()
      .transform((val) => Number(val))
      .pipe(z.number().min(1)),
  }),
});

export const deleteMarkersSchema = z.object({
  params: z.object({
    id: z
      .string()
      .transform((val) => Number(val))
      .pipe(z.number()),
  }),
});

export const patchMarkerSchema = z.object({
  body: z
    .object({
      description: z.string(),
      lat: z.number(),
      lng: z.number(),
    })
    .partial(),
  params: z.object({
    id: z
      .string()
      .transform((val) => Number(val))
      .pipe(z.number()),
  }),
});
