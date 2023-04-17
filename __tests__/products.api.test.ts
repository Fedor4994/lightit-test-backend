import request from "supertest";
import app from "../src/app";
import http from "http";
import mongoose from "mongoose";
import { ProductData } from "../src/types/product";

const { MONGO_URL } = process.env;
const PORT = 8081;

describe("test products routes", () => {
  //connection/disconnection to server and db
  let server: http.Server;
  mongoose.set("strictQuery", false);

  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(MONGO_URL || "").then(() => done());
  });
  afterEach((done) => {
    mongoose.connection.close(() => done());
  });

  //products routes tests
  it("should return array with 10 products without query params", async () => {
    const productMatcher = {
      title: expect.any(String),
      category: expect.any(String),
      price: expect.any(Number),
    };

    const response = await request(app).get("/api/products");

    const { statusCode, body } = response;

    expect(statusCode).toBe(200);
    expect(body.length).toBe(10);
    body.forEach((product: ProductData) => {
      expect(product).toMatchObject(productMatcher);
    });
  });

  it("should return array with 12 products with query limit=12", async () => {
    const productMatcher = {
      title: expect.any(String),
      category: expect.any(String),
      price: expect.any(Number),
    };

    const response = await request(app).get("/api/products?limit=12");

    const { statusCode, body } = response;

    expect(statusCode).toBe(200);
    expect(body.length).toBe(12);
    body.forEach((product: ProductData) => {
      expect(product).toMatchObject(productMatcher);
    });
  });

  it("shouldn't return product with incorrect id", async () => {
    await request(app).get("/api/products/-100").expect(404, {
      message: "Not found",
    });
  });

  it("should return product with correct id", async () => {
    const productMatcher = {
      title: expect.any(String),
      category: expect.any(String),
      price: expect.any(Number),
    };

    const response = await request(app).get(
      "/api/products/6436f461929d441e311b47b2"
    );

    const { statusCode, body } = response;

    expect(statusCode).toBe(200);

    expect(body).toMatchObject(productMatcher);
  });

  it("should return empty array of products by incorrect category", async () => {
    const response = await request(app).get("/api/products/categories/qweqwe");

    const { statusCode, body } = response;

    expect(statusCode).toBe(200);
    expect(body.length).toBe(0);
  });

  it("should return array of products with category by correct category", async () => {
    const category = "smartphones";

    const response = await request(app).get(
      `/api/products/categories/${category}`
    );

    const { statusCode, body } = response;

    expect(statusCode).toBe(200);
    body.forEach((product: ProductData) => {
      expect(product).toMatchObject({ category });
    });
  });

  it("should return array with categories", async () => {
    const response = await request(app).get("/api/products/categories");

    const { statusCode, body } = response;

    expect(statusCode).toBe(200);
    expect(body.length).toBeGreaterThan(5);

    const result = body.every((element: string) => typeof element === "string");
    expect(result).toBe(true);
  });
});
