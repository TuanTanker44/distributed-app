import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";

const packageDef = protoLoader.loadSync(
  [
    path.resolve("../protos/auth.proto"),
    path.resolve("../protos/admin.proto"),
    path.resolve("../protos/user.proto"),
    path.resolve("../protos/quiz.proto"),
  ],
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
  },
);

const authProto = grpc.loadPackageDefinition(packageDef).auth;
const adminProto = grpc.loadPackageDefinition(packageDef).admin;
const userProto = grpc.loadPackageDefinition(packageDef).user;
const quizProto = grpc.loadPackageDefinition(packageDef).quiz;

export const authClient = new authProto.AuthService(
  "localhost:50051",
  grpc.credentials.createInsecure(),
);

export const adminClient = new adminProto.AdminService(
  "localhost:50051",
  grpc.credentials.createInsecure(),
);

export const userClient = new userProto.UserService(
  "localhost:50051",
  grpc.credentials.createInsecure(),
);

export const quizClient = new quizProto.QuizService(
  "localhost:50051",
  grpc.credentials.createInsecure(),
);
