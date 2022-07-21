"use strict";

const { it, expect } = require("@jest/globals");
const Survivor = require("../src/routes/survivor");
const supertest = require("supertest");
const server = require("../src/server");
const request = supertest(server.app);

describe("Survivor", () => {
  it("Gets survivors", async () => {
    const response = await request.get("/survivor");
    expect(response.status).toBe(200);
  });
});
