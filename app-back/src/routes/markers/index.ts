import { Router } from "express";
import {
  createMarker,
  deleteMarker,
  findMarkers,
  patchMarker,
} from "./controller";
import {
  createMarkerSchema,
  deleteMarkersSchema,
  findMarkersSchema,
  patchMarkerSchema,
  validateData,
} from "./validation";

const router: Router = Router();

router.post("/markers", validateData(createMarkerSchema), createMarker);
router.get("/markers", validateData(findMarkersSchema), findMarkers);
router.delete("/marker/:id", validateData(deleteMarkersSchema), deleteMarker);
router.patch("/marker/:id", validateData(patchMarkerSchema), patchMarker);

export default router;
