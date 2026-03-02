import express, { json } from "express";
import routes from "./routers/index.js";

function startHttpServer() {
  const app = express();

  app.use(json());
  app.use("/api", routes);

  app.get("/api/health", (req, res) => {
    res.json({ status: "REST OK" });
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Express running on port ${process.env.PORT || 3000}`);
  });
}

export default startHttpServer;
