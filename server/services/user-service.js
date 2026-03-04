import UserModel from "../models/User.js";

class UserService {
  async getAllUsers() {
    const users = await UserModel.findAll();
    return users;
  }
  async getUser(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
  async createUser(name, email, password_hash) {
    const newUser = await UserModel.create({
      username: name,
      email: email,
      password_hash: password_hash,
    });
    if (!newUser) {
      throw new Error("Failed to create user");
    }
    return newUser;
  }
  async updateUser(id, data) {
    const updatedUser = await UserModel.update(id, data);
    if (!updatedUser) {
      throw new Error("Failed to update user");
    }
    return updatedUser;
  }
  async banUser(id) {
    const bannedUser = await UserModel.update(id, { status: "BANNED" });
    if (!bannedUser) {
      throw new Error("Failed to ban user");
    }
    return bannedUser;
  }
  async deleteUser(id) {
    const deletedUser = await UserModel.update(id, { status: "DELETED" });
    if (!deletedUser) {
      throw new Error("Failed to delete user");
    }
    return deletedUser;
  }
}

export default new UserService();
