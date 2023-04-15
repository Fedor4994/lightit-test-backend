import { Types } from "mongoose";

export type AuthUserResponse = {
  user: {
    username: string;
    _id: Types.ObjectId;
  };
  token: string;
};
