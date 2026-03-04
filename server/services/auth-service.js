import jwt from "jsonwebtoken";
import bcypt from "bcrypt";
import UserService from "./user-service.js";

function hashPassword(password) {
  return bcypt.hash(password, 10);
}

class AuthService {
  register(username, email, password) {
    const hashedPassword = hashPassword(password);
    const newUser = UserService.createUser(username, email, hashedPassword);
    const accessToken = jwt.sign(
      {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    return { email: newUser.email, accessToken };
  }
  login(username, password) {
    const user = UserService.getUserByUsername(username);
    const isPasswordValid = bcypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const accessToken = jwt.sign(
      {
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    return { email: user.email, accessToken };
  }
}

export default AuthService;
