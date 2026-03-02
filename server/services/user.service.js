import UserRepository from "../repositories/user.repo.js";

class UserService {
  async getAllUsers() {
    const users = await UserRepository.findAll();
    return users;
  }
  async getUser(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
  async createUser(name, email, password_hash) {
    const newUser = await UserRepository.create({
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
    const updatedUser = await UserRepository.update(id, data);
    if (!updatedUser) {
      throw new Error("Failed to update user");
    }
    return updatedUser;
  }
}

export default new UserService();
