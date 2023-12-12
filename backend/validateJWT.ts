import { expressjwt } from "express-jwt";

const validateJWT = expressjwt({
  secret: process.env.JWT_SECRET!,
  algorithms: ["HS256"],
});

export default validateJWT;
