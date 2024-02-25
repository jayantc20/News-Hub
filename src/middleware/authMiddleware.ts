import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import logger from "../utils/logger";

const JWT_SECRET: string = config.get("SECRET_KEY");

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    const error = "Authentication failed";
    logger.info({ error });
    res.status(401).json({ error });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body.userId = (decoded as { userId: string }).userId;
    next();
  } catch (error: any) {
    logger.error(error.stack);
    res.status(401).json({ error: "Authentication failed" });
  }
};
