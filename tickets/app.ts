import express from "express";

const app = express();

app.get("/api/tickets/health-check", (req, res) => {
  return res.send({ status: "ok" });
});

export { app };
