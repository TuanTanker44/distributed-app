import express from "express";
import { status } from "@grpc/grpc-js";
import { userClient } from "../grpc/clients.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

// PROFILE

// GET profile
router.get(
  "/profile/:userId",
  authenticate,
  authorize("USER", "ADMIN"),
  (req, res) => {
    const request = {
      user_id: parseInt(req.params.userId),
    };

    userClient.GetProfile(request, (err, response) => {
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

// UPDATE profile
router.put(
  "/profile/:userId",
  authenticate,
  authorize("USER", "ADMIN"),
  (req, res) => {
    const request = {
      user_id: parseInt(req.params.userId),
      username: req.body.username,
    };

    userClient.UpdateProfile(request, (err, response) => {
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

// PASSWORD

router.put(
  "/change-password",
  authenticate,
  authorize("USER", "ADMIN"),
  (req, res) => {
    const request = {
      user_id: req.body.user_id,
      old_password: req.body.old_password,
      new_password: req.body.new_password,
    };

    userClient.ChangePassword(request, (err) => {
      if (err) {
        if (err.code === status.NOT_FOUND) {
          return res.status(404).json({ message: err.details });
        }

        if (err.code === status.UNAUTHENTICATED) {
          return res.status(401).json({ message: err.details });
        }

        return res.status(500).json({ message: err.details });
      }

      res.json({
        message: "Password changed successfully",
      });
    });
  },
);

// SUBJECT

// GET all subjects
router.get(
  "/subjects",
  authenticate,
  authorize("USER", "ADMIN"),
  (req, res) => {
    userClient.GetSubjects({}, (err, response) => {
      if (err) {
        if (err.code === status.NOT_FOUND) {
          return res.status(404).json({ message: err.details });
        }

        if (err.code === status.UNAUTHENTICATED) {
          return res.status(401).json({ message: err.details });
        }

        return res.status(500).json({ message: err.details });
      }

      res.json(response.subjects);
    });
  },
);

// GET subject detail
router.get(
  "/subjects/:subjectId",
  authenticate,
  authorize("USER", "ADMIN"),
  (req, res) => {
    const request = {
      subject_id: parseInt(req.params.subjectId),
    };

    userClient.GetSubjectDetail(request, (err, response) => {
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

// QUIZ HISTORY

// GET history
router.get(
  "/quiz-history/:userId",
  authenticate,
  authorize("USER", "ADMIN"),
  (req, res) => {
    const request = {
      user_id: parseInt(req.params.userId),
    };

    userClient.GetQuizHistory(request, (err, response) => {
      if (err) {
        if (err.code === status.NOT_FOUND) {
          return res.status(404).json({ message: err.details });
        }

        if (err.code === status.UNAUTHENTICATED) {
          return res.status(401).json({ message: err.details });
        }

        return res.status(500).json({ message: err.details });
      }

      res.json(response.results);
    });
  },
);

// GET result detail
router.get(
  "/quiz-result/:sessionId",
  authenticate,
  authorize("USER", "ADMIN"),
  (req, res) => {
    const request = {
      quiz_session_id: parseInt(req.params.sessionId),
    };

    userClient.GetQuizResultDetail(request, (err, response) => {
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

// PROGRESS

// SAVE progress
router.post("/progress", authenticate, (req, res) => {
  const request = {
    quiz_session_id: req.body.quiz_session_id,
    progress_data: JSON.stringify(req.body.progress_data),
  };

  userClient.SaveProgress(request, (err) => {
    if (err) {
      if (err.code === status.NOT_FOUND) {
        return res.status(404).json({ message: err.details });
      }

      if (err.code === status.UNAUTHENTICATED) {
        return res.status(401).json({ message: err.details });
      }

      return res.status(500).json({ message: err.details });
    }

    res.json({
      message: "Progress saved",
    });
  });
});

// GET progress
router.get("/progress/:sessionId", authenticate, (req, res) => {
  const request = {
    quiz_session_id: parseInt(req.params.sessionId),
  };

  userClient.GetSavedProgress(request, (err, response) => {
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
