import { loadPackageDefinition } from "@grpc/grpc-js";
import grpc from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import userHandler from "./handlers/user.handler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageDefinition = loadSync(join(__dirname, "../protos/user.proto"), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = loadPackageDefinition(packageDefinition).user;

const server = new grpc.Server();

server.addService(userProto.UserService.service, userHandler);

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
