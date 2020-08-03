import express from "express";
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());

app.get("/api/users/health-check", (req, res) => {
  res.send({ status: "OK" });
});

app.get("/api/users/current-user", (req, res) => {
  res.send({ hello: "world" });
});

app.post("/api/users/singup", (req, res) => {
  res.send({ hello: "world" });
});
app.post("/api/users/signin", (req, res) => {
  res.send({ hello: "world" });
});
app.post("/api/users/singout", (req, res) => {
  res.send({ hello: "world" });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}!!!`);
});
