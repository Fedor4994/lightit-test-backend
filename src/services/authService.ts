import { User } from "../db/userModel";
import { isValidPassword } from "../helpers/validPassword";
import { UserData } from "../types/user";
import jwt from "jsonwebtoken";

export const register = async (body: UserData) => {
  const { username, password } = body;
  const user = await User.findOne({ username });
  if (user) {
    return false;
  }

  const newUser = new User({ username, password });
  await newUser.save();

  const token = jwt.sign(
    {
      _id: newUser._id,
    },
    process.env.JWT_SECRET || ""
  );
  return { newUser, token };
};

export const login = async (body: UserData) => {
  const { username, password } = body;
  const newUser = await User.findOne({ username });
  if (!newUser) {
    return false;
  }

  const isCorrectPassword = await isValidPassword(password, newUser.password);
  if (!isCorrectPassword) {
    return false;
  }

  const token = jwt.sign(
    {
      _id: newUser._id,
    },
    process.env.JWT_SECRET || ""
  );

  return { newUser, token };
};

export const getCurrentUser = async (user: { _id: string }) => {
  const { _id } = user;
  const newUser = await User.findOne({ _id });

  if (!newUser) {
    return false;
  }

  return newUser;
};
