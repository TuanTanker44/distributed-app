import grpc from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { loadPackageDefinition } from "@grpc/grpc-js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import path from "path";
import { AdminService } from "./services/admin-service.js";
import { AuthService } from "./services/auth-service.js";
import { UserService } from "./services/user-service.js";
import { QuizService } from "./services/quiz-service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageDefinition = loadSync(
  [
    path.join(__dirname, "../protos/admin.proto"),
    path.join(__dirname, "../protos/auth.proto"),
    path.join(__dirname, "../protos/user.proto"),
    path.join(__dirname, "../protos/quiz.proto"),
  ],
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
);

const proto = loadPackageDefinition(packageDefinition);

const adminProto = proto.admin;

const server = new grpc.Server();

server.addService(adminProto.AdminService.service, AdminService);
server.addService(proto.auth.AuthService.service, AuthService);
server.addService(proto.user.UserService.service, UserService);
server.addService(proto.quiz.QuizService.service, QuizService);

export default function startGrpcServer() {
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`Server running at port ${port}`);
      server.start();
    },
  );
}
