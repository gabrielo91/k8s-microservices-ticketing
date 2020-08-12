import express from "express";
import { healthCheckRouter } from "./routes/health-check";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());

app.use(healthCheckRouter);
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}!!!`);
});
