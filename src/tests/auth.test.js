import request from "supertest";
import app from "../../app.js";
import prisma from "../config/prisma.js";

describe("Auth API", () => {
  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
  const email = `test${Date.now()}@test.com`;


  it("should register a new user", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "Test User",
      email: email,
      password: "123456",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty("email", email);
  });



  it("should login user", async () => {
    // create user first
    await request(app).post("/auth/register").send({
      name: "Test User",
      email: email,
      password: "123456",
    });

    const res = await request(app).post("/auth/login").send({
      email: email,
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  
  it("should fail without token", async () => {
    const res = await request(app).get("/auth/profile/me");
    expect(res.statusCode).toBe(401);
  });
  


  it("should get profile with token", async () => {
    
    await request(app).post("/auth/register").send({
      name: "Test User",
      email: email,
      password: "123456",
    });

    const login = await request(app).post("/auth/login").send({
      email: email,
      password: "123456",
    });

    const token = login.body.token;

    const res = await request(app)
      .get("/auth/profile/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
