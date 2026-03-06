import express from "express";
import { status } from "@grpc/grpc-js";
import { authClient } from "../grpc/clients.js";

const router = express.Router();

router.post("/login", (req, res) => {
  authClient.Login(req.body, (err, response) => {
    if (err) {
      if (err.code === status.NOT_FOUND) {
        return res.status(404).json({ message: err.details });
      }

      if (err.code === status.UNAUTHENTICATED) {
        return res.status(401).json({ message: err.details });
      }

      return res.status(500).json({ message: err.details });
    }

    res.json(response);
  });
});

router.post("/register", (req, res) => {
  authClient.Register(req.body, (err, response) => {
    if (err) {
      if (err.code === status.NOT_FOUND) {
        return res.status(404).json({ message: err.details });
      }

      if (err.code === status.UNAUTHENTICATED) {
        return res.status(401).json({ message: err.details });
      }

      return res.status(500).json({ message: err.details });
    }

    res.json(response);
  });
});

export default router;
