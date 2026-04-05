import jwt from "jsonwebtoken";

const SECRET = "secret";

export const generateToken = (userId: number) =>
  jwt.sign({ userId }, SECRET, { expiresIn: "15m" });

export const verifyToken = (token: string) =>
  jwt.verify(token, SECRET) as { userId: number };