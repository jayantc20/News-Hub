import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import { NewsPreferences } from "../models/NewsPreference";

const users: User[] = [];
const expiresIn: string = config.get("ExpiresIn");
const JWT_SECRET: string = config.get("SECRET_KEY");

export const registerUser = async (
  username: string,
  password: string
): Promise<{ id: string; username: string }> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: String(users.length + 1),
    username,
    password: hashedPassword,
  };
  users.push(newUser);

  return { id: newUser.id, username: newUser.username };
};

export const loginUser = async (
  username: string,
  password: string
): Promise<
  { token: string; username: string } | { error: string; status: number }
> => {
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: "Invalid credentials", status: 401 };
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: expiresIn,
    }
  );

  return { token, username: user.username };
};
