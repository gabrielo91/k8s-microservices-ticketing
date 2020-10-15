import request from "supertest";
import { app } from "../../app";

const newTicket = { title: "foo", price: "foo" };

describe("Test tickets routes", () => {
  it("should retrieve all tickets", async () => {
    const response = await request(app).get("/api/tickets").expect(200);
    expect(response.body).toEqual([{}, {}, {}]);
  });

  it("should retrieve a ticket with the specified id", async () => {
    const response = await request(app).get("/api/tickets/1").expect(200);
    expect(response.body).toEqual({ title: "foo", price: "foo" });
  });

  it("should create a new ticket and return it", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .send(newTicket)
      .expect(201);
    expect(response.body).toEqual([{}, {}, {}]);
  });

  it("should update a new ticket and return it", async () => {
    const response = await request(app)
      .put("/api/tickets")
      .send(newTicket)
      .expect(201);
    expect(response.body).toEqual([{}, {}, {}]);
  });
});
