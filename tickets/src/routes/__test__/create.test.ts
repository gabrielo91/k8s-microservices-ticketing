import request from "supertest";
import { app } from "../../app";

const newTicket = { title: "foo", price: "foo" };

describe("Test tickets routes", () => {
  it("has a route handler listening to /api/tickets for post requests", async () => {
    const response = await request(app).post("/api/tickets").send(newTicket);
    expect(response.status).not.toEqual(404);
  });
  it("can only be accessed if the user is signed in", async () => {
    await request(app).post("/api/tickets").send(newTicket).expect(401);
  });
  it("returns a status other than 401 if the user is signed in", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send(newTicket);

    expect(response.status).not.toEqual(401);
  });

  it("return error if an invalid price is provided", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        ticket: "",
        price: 10,
      })
      .expect(400);

    const response2 = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        price: 10,
      })
      .expect(400);
  });

  it("return error in an invalid price is provided", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        ticket: "my-ticket",
        price: -10,
      })
      .expect(400);

    const response2 = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        ticket: "my-ticket",
      })
      .expect(400);
  });
  /**
  it("creates a ticket with valid inputs", async () => {
    const response = await request(app).get("/api/tickets/1").expect(200);
    expect(response.body).toEqual({});
  });

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
      .expect(200);
    expect(response.body).toEqual([{}, {}, {}]);
  });

  */
});
