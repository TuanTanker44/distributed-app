import express from "express";
import { quizClient } from "../grpc/clients.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

/*
CREATE QUIZ
POST /api/quiz
*/
router.post("/", authenticate, authorize("USER", "ADMIN"), (req, res) => {
  quizClient.CreateQuiz(req.body, (err, response) => {
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

/*
GET QUIZ SESSION
GET /api/quiz/:sessionId
*/
router.get(
  "/:sessionId",
  authenticate,
  authorize("USER", "ADMIN"),
  (req, res) => {
    const { sessionId } = req.params;
    const { user_id } = req.query;

    quizClient.GetQuizSession(
      {
        session_id: Number(sessionId),
        user_id: Number(user_id),
      },
      (err, response) => {
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
      },
    );
  },
);

/*
SUBMIT ANSWER
POST /api/quiz/answer
*/
router.post("/answer", authenticate, authorize("USER", "ADMIN"), (req, res) => {
  quizClient.SubmitAnswer(req.body, (err, response) => {
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

/*
COMPLETE QUIZ
POST /api/quiz/complete
*/
router.post(
  "/complete",
  authenticate,
  authorize("USER", "ADMIN"),
  (req, res) => {
    quizClient.CompleteQuiz(req.body, (err, response) => {
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
  },
);

export default router;
