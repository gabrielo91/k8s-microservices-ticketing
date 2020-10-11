import "express-async-errors";
import { app } from "./app";
import mongoose from "mongoose";

const PORT = 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, () => {
    console.log(`Listening Tickets on port ${PORT}`);
  });
};

start();
