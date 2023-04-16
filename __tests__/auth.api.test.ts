import request from "supertest";
import app from "../src/app";
import http from "http";
import mongoose from "mongoose";
import { User } from "../src/db/userModel";
import { UserData } from "../src/types/user";

const { PORT, MONGO_URL } = process.env;

describe("test auth routes", () => {
  //connection/disconnection to server and db
  let server: http.Server;
  mongoose.set("strictQuery", false);

  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(MONGO_URL || "").then(() => done());
  });
  afterEach((done) => {
    mongoose.connection.db.dropCollection("users", () => {
      mongoose.connection.close(() => done());
    });
  });

  //auth reoutes tests
  it("shouldn't create new user without data", async () => {
    await request(app)
      .post("/api/users/register")
      .expect(400, { message: 'ValidationError: "username" is required' });
  });

  it("shouldn't create new user with existing username", async () => {
    const newUser: UserData = { username: "ExistingUser", password: "qweqwe" };
    await User.create(newUser);

    await request(app)
      .post("/api/users/register")
      .send(newUser)
      .expect(409, { message: "Username in use" });
  });

  it("should create new user with correct input data", async () => {
    const newUser: UserData = { username: "TestUser", password: "qweqwe" };

    const response = await request(app)
      .post("/api/users/register")
      .send(newUser);

    const { statusCode, body } = response;

    expect(statusCode).toBe(201);
    expect(body.token).toBeTruthy();
    expect(body.user).toBeTruthy();
  });

  it("shouldn't login user with incorrect input data", async () => {
    const newUser: UserData = { username: "Test", password: "qweqwe" };
    await User.create(newUser);

    const loginUser: UserData = { username: "Test", password: "123123" };
    await request(app).post("/api/users/login").send(loginUser).expect(401, {
      message: "Email or password is wrong",
    });
  });

  it("shouldn't login user without input data", async () => {
    await request(app)
      .post("/api/users/login")
      .expect(400, { message: 'ValidationError: "username" is required' });
  });

  it("should login user with correct input data", async () => {
    const newUser: UserData = { username: "Test", password: "qweqwe" };
    await User.create(newUser);

    const loginUser: UserData = { username: "Test", password: "qweqwe" };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);

    const {
      statusCode,
      body: { user, token },
    } = response;

    expect(statusCode).toBe(200);
    expect(token).toBeTruthy();
    expect(user).toBeTruthy();
  });

  it("shouldn't return user with incorrect token", async () => {
    await request(app)
      .get("/api/users/current")
      .set("Authorization", "Bearer incorrectToken")
      .expect(401, {
        message: "Invalid token",
      });
  });

  it("Should ask to provide token in request without token", async () => {
    await request(app).get("/api/users/current").expect(401, {
      message: "Please, provide a token",
    });
  });

  it("should return user with correct token", async () => {
    const newUser: UserData = { username: "Test", password: "qweqwe" };
    const {
      body: { token },
    } = await request(app).post("/api/users/register").send(newUser);

    const response = await request(app)
      .get("/api/users/current")
      .set("Authorization", `Bearer ${token}`);

    const {
      statusCode,
      body: { user },
    } = response;

    expect(statusCode).toBe(200);
    expect(user).toBeTruthy();
  });
});
