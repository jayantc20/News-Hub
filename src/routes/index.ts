import { Router } from "express";
import userRoutes from "./userRoutes";
import newsRoutes from "./newsRoutes";
import preferenceRouter from "./preferenceRoutes";

const router = Router();

router.use("/api/v1/users", userRoutes);

router.use("/api/v1/news", newsRoutes);

router.use("/api/v1/preferences", preferenceRouter);

export default router;
