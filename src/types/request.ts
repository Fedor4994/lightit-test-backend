import { Request } from "express";

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;
export type RequestWithParams<T> = Request<T>;
export type RequestWithParamsAndQuery<T, U> = Request<T, {}, {}, U>;
export interface AuthRequest extends Request {
  user?: {
    _id: string;
  };
}
