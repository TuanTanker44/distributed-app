import bcrypt from "bcrypt";
import userService from "./user.service.js";

class AuthService {
  async login(data) {
    const user = await UserRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.password_hash,
    );
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    return {
      id: user.id,
      name: user.username,
      email: user.email,
    };
  }
  async register(data) {
    const passwordHash = await bcrypt.hash(data.password, 10);

    const newUser = await userService.createUser({
      username: data.name,
      email: data.email,
      password_hash: passwordHash,
    });
    return newUser;
  }
  async changePassword(userId, oldPassword, newPassword) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const isOldPasswordValid = await bcrypt.compare(
      oldPassword,
      user.password_hash,
    );
    if (!isOldPasswordValid) {
      throw new Error("Old password is incorrect");
    }
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    const updatedUser = await UserRepository.updatePassword(
      userId,
      newPasswordHash,
    );
    if (!updatedUser) {
      throw new Error("Failed to update password");
    }
    return {
      success: true,
      id: updatedUser.id,
      name: updatedUser.username,
      email: updatedUser.email,
    };
  }
}

export default new AuthService();
