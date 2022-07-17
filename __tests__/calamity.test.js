"use strict";

const Calamity = require("../src/routes/calamity");
const supertest = require("supertest");
const server = require("../src/server");
const request = supertest(server.app);

describe("Calamity", () => {
  it("Gets calamities", async () => {
    const response = await request.get("/calamity");
    expect(response.status).toBe(200);
  });
});
