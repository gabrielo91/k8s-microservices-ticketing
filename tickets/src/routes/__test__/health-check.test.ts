import request from "supertest";
import { app } from "../../app";

describe("test app", () => {
  it("should return status ok when get health-check route", async (done) => {
    const response = await request(app)
      .get("/api/tickets/health-check")
      .expect(200);
    expect(response.body).toEqual({ status: "ok" });
    done();
  });
});
