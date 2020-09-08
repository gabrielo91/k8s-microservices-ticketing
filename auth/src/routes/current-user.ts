import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/current-user", (req, res) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!); // Don´t worry about this value, it won't be null
    res.send({ currentUser: payload });
  } catch (err) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
