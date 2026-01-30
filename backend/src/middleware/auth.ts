import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        tenantId: string;
      };
    }
  }
}

export default function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  req.user = {
    id: "user-1",
    name: "Sachin",
    tenantId: "tenant-1"
  };
  next();
}
