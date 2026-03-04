import UserService from "../services/user-service.js";

export default {
  GetUser: async (call, callback) => {
    try {
      const user = await UserService.getUser(call.request.id);

      callback(null, {
        id: user.id,
        name: user.username,
        email: user.email,
        created_at: String(user.created_at),
        updated_at: String(user.updated_at),
      });
    } catch (err) {
      callback({
        code: 5, // NOT_FOUND
        message: err.message,
      });
    }
  },
  CreateUser: async (call, callback) => {
    try {
      const user = await UserService.createUser(call.request);

      callback(null, {
        id: user.id,
        name: user.username,
        email: user.email,
        created_at: String(user.created_at),
      });
    } catch (err) {
      callback({
        code: 13, // INTERNAL
        message: err.message,
      });
    }
  },
  GetUserAdmin: async (call, callback) => {
    try {
      const user = await UserService.getUser(call.request.id);

      callback(null, {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        created_at: String(user.created_at),
        updated_at: String(user.updated_at),
      });
    } catch (err) {
      callback({
        code: 5, // NOT_FOUND
        message: err.message,
      });
    }
  },
  GetAllUsers: async (call, callback) => {
    try {
      const users = await UserService.getAllUsers();

      callback(null, {
        users: users.map((u) => ({
          id: u.id,
          email: u.email,
          username: u.username,
          role: u.role,
          created_at: String(u.created_at),
          updated_at: String(u.updated_at),
        })),
      });
    } catch (err) {
      callback({
        code: 13, // INTERNAL
        message: err.message,
      });
    }
  },
};
