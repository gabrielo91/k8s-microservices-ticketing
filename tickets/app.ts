import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError } from "@gb-tickets/common";

const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.get("/api/tickets/health-check", (req, res) => {
  return res.send({ status: "ok" });
});

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
