import { Request, Response, NextFunction } from "express";
import {
  getPreferences,
  updatePreferences,
  createPreferences,
} from "../services/preferenceService";

export const getPreferencesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.userId;
    const result = await getPreferences(userId);
    if ("error" in result) {
      res.status(result.status).json({ error: result.error });
    } else {
      res.json({ preferences: result });
    }
  } catch (error) {
    next(error);
  }
};

export const updatePreferencesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.userId;
    const preferences = req.body.preferences;
    const result = await updatePreferences(userId, preferences);
    if ("error" in result) {
      res.status(result.status).json({ error: result.error });
    } else {
      res.json({ preferences: result });
    }
  } catch (error) {
    next(error);
  }
};

export const createPreferencesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.userId;
    const preferences = req.body.preferences;
    const result = await createPreferences(userId, preferences);
    if ("error" in result) {
      res.status(result.status).json({ error: result.error });
    } else {
      res.json({ preferences: result });
    }
  } catch (error) {
    next(error);
  }
};
