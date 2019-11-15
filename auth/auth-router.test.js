const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");

beforeEach(async () => {
  await db("users").truncate();
});

describe("Auth Router", () => {
  describe("POST /api/auth/register", () => {
    it("should return a 201 status when giving username and password", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "jambis", password: "pass" })
        .set("Accept", "application/json");

      return expect(res.status).toBe(201);
    });

    it("should return a token upon successful register", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "jambis", password: "pass" })
        .set("Accept", "application/json");

      expect(res.body.token).toBeTruthy();
    });
  });

  describe("POST /api/auth/login", () => {
    it("should return a 200 status when giving username and password", async () => {
      const [added] = await db("users").insert({
        username: "jambis",
        password: bcrypt.hashSync("pass", 12)
      });

      if (added) {
        console.log(added);
        const res = await request(server)
          .post("/api/auth/login")
          .send({ username: "jambis", password: "pass" })
          .set("Accept", "application/json");

        return expect(res.status).toBe(200);
      }
    });

    it("should return a token upon successful login", async () => {
      const [added] = await db("users").insert({
        username: "jambis",
        password: bcrypt.hashSync("pass", 12)
      });

      if (added) {
        const res = await request(server)
          .post("/api/auth/login")
          .send({ username: "jambis", password: "pass" });

        expect(res.body.token).toBeTruthy();
      }
    });
  });
});
