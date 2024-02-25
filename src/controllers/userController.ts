import { NextFunction, Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, preferences } = req.body;
    const user = await registerUser(username, password);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const result = await loginUser(username, password);
    if ("error" in result) {
      res.status(result.status).json({ error: result.error });
    } else {
      res.json({ token: result.token });
    }
  } catch (error) {
    next(error);
  }
};
