import { Router } from "express";
import MarkersRouter from "./markers";

const router: Router = Router();
router.use(MarkersRouter);

export default router;