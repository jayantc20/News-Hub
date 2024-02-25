import { Router } from "express";
import { preferencesValidator } from "../middleware/userPreferenceValidatorMiddleware";
import {
  getPreferencesController,
  updatePreferencesController,
  createPreferencesController,
} from "../controllers/preferenceController";
import { authenticateUser } from "../middleware/authMiddleware";

const preferenceRouter = Router();

// Get User Preferences
preferenceRouter.get("/", authenticateUser, getPreferencesController);

// Update User Preferences
preferenceRouter.put(
  "/",
  authenticateUser,
  preferencesValidator,
  updatePreferencesController
);

// Create User Preferences
preferenceRouter.post(
  "/",
  authenticateUser,
  preferencesValidator,
  createPreferencesController
);

export default preferenceRouter;
