import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createMarkerDB,
  deleteMarkersDB,
  findMarkersDB,
  patchMarkerDB,
} from "./service";

export const createMarker = async (req: Request, res: Response) => {
  try {
    const marker = await createMarkerDB(req.body);
    return res.status(StatusCodes.OK).json({
      data: marker,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Unable to create marker",
      details: error,
    });
  }
};

export const findMarkers = async (req: Request, res: Response) => {
  try {
    const data = await findMarkersDB({
      offset: Number(req.query.offset),
      limit: Number(req.query.limit),
    });
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    console.log("error", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Unable to get markers",
      details: error,
    });
  }
};

export const deleteMarker = async (req: Request, res: Response) => {
  try {
    const data = await deleteMarkersDB(Number(req.params.id));
    return res.status(StatusCodes.OK).json({
      data,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Unable to delete marker",
      details: error,
    });
  }
};

export const patchMarker = async (req: Request, res: Response) => {
  try {
    const marker = await patchMarkerDB({ ...req.body, ...req.params });
    return res.status(StatusCodes.OK).json({
      data: marker,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Unable to patch marker",
      details: error,
    });
  }
};
