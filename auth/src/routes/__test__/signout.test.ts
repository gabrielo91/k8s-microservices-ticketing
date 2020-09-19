import request from "supertest";
import { app } from "../../app";

it("clears the cookie after signing out", async () => {
  await global.getAuthCookie();

  const response = await request(app).post("/api/users/signout").expect(200);
  expect(response.get("Set-Cookie")[0]).toEqual(
    "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});

it("responds with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/current-user")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
