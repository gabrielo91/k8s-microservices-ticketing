import express from "express";

const router = express.Router();

router.get("/api/users/current-user", (req, res) => {
  res.send({ status: "OK" });
});

export { router as currentUserRouter };
