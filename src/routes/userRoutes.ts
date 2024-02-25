import { Router } from "express";
import {
  registrationValidator,
  loginValidator,
} from "../middleware/userValidatorMiddleware";
import {
  registerUserController,
  loginUserController,
} from "../controllers/userController";

const userRouter = Router();

// Register User
userRouter.post("/register", registrationValidator, registerUserController);

// Login User
userRouter.post("/login", loginValidator, loginUserController);

export default userRouter;
