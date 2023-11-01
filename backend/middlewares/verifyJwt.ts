import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  var token = req.headers?.["authorization"]?.split(" ")[1];
  console.log(token);

  if (!token) {
    return res.status(401).send({ message: "Token not provided" });
  }

  jwt.verify(token!, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Invalid token" });
    next();
  });
}
