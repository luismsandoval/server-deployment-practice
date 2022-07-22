"use strict";

const { it, expect } = require("@jest/globals");
const supertest = require("supertest");
const server = require("../src/server");
const request = supertest(server.app);

describe("Calamity", () => {
  it("Gets calamities", async () => {
    const response = await request.get("/calamity");
    expect(response.status).toBe(200);
  });
});
