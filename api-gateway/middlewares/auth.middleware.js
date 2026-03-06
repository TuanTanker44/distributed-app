import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Missing token",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded; // {user_id, role}
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}
