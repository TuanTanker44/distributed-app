import express from "express";
import { status } from "@grpc/grpc-js";
import { adminClient } from "../grpc/clients.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

//  USER MANAGEMENT

// GET /api/admin/users
router.get("/users", authenticate, authorize("ADMIN"), (req, res) => {
  adminClient.GetAllUsers({}, (err, response) => {
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

// patch /api/admin/users/status
router.patch("/users/status", authenticate, authorize("ADMIN"), (req, res) => {
  const { user_id, status } = req.body;

  adminClient.UpdateUserStatus({ user_id, status }, (err, response) => {
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

// patch /api/admin/users/role
router.patch("/users/role", authenticate, authorize("ADMIN"), (req, res) => {
  const { user_id, role } = req.body;

  adminClient.UpdateUserRole({ user_id, role }, (err, response) => {
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

// DELETE /api/admin/users/:id
router.delete("/users/:id", authenticate, authorize("ADMIN"), (req, res) => {
  const user_id = parseInt(req.params.id);

  adminClient.DeleteUser({ user_id }, (err, response) => {
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

//  SUBJECT MANAGEMENT

// POST /api/admin/subjects
router.post("/subjects", authenticate, authorize("ADMIN"), (req, res) => {
  const { name, description } = req.body;

  adminClient.CreateSubject({ name, description }, (err, response) => {
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

// GET /api/admin/subjects
router.get("/subjects", authenticate, authorize("ADMIN"), (req, res) => {
  adminClient.GetAllSubjects({}, (err, response) => {
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

// patch /api/admin/subjects/:id
router.patch("/subjects/:id", authenticate, authorize("ADMIN"), (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;

  adminClient.UpdateSubject({ id, name, description }, (err, response) => {
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

// DELETE /api/admin/subjects/:id
router.delete("/subjects/:id", authenticate, authorize("ADMIN"), (req, res) => {
  const subject_id = parseInt(req.params.id);

  adminClient.DeleteSubject({ subject_id }, (err, response) => {
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

//  QUESTION MANAGEMENT

// POST /api/admin/questions
router.post("/questions", authenticate, authorize("ADMIN"), (req, res) => {
  adminClient.CreateQuestion(req.body, (err, response) => {
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

// GET /api/admin/questions
router.get("/questions", authenticate, authorize("ADMIN"), (req, res) => {
  const { subject_id, difficulty } = req.query;

  adminClient.GetAllQuestions(
    {
      subject_id: subject_id ? parseInt(subject_id) : 0,
      difficulty: difficulty || "",
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
});

// GET /api/admin/questions/:id
router.get("/questions/:id", authenticate, authorize("ADMIN"), (req, res) => {
  const question_id = parseInt(req.params.id);

  adminClient.GetQuestionById({ question_id }, (err, response) => {
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

// patch /api/admin/questions/:id
router.patch("/questions/:id", authenticate, authorize("ADMIN"), (req, res) => {
  const id = parseInt(req.params.id);

  adminClient.UpdateQuestion({ ...req.body, id }, (err, response) => {
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

// DELETE /api/admin/questions/:id
router.delete(
  "/questions/:id",
  authenticate,
  authorize("ADMIN"),
  (req, res) => {
    const question_id = parseInt(req.params.id);

    adminClient.DeleteQuestion({ question_id }, (err, response) => {
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
