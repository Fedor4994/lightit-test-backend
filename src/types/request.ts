import { Request } from "express";

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export interface AuthRequest extends Request {
  user?: {
    _id: string;
  };
}
