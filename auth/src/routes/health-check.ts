import express from "express";

const router = express.Router();

router.get("/api/users/health-check", (req, res) => {
  res.send({ status: "OK" });
});

export { router as healthCheckRouter };
