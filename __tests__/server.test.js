"use strict";

const { it, expect } = require("@jest/globals");
const supertest = require("supertest");
const server = require("../src/server.js");

const request = supertest(server.app);

describe("Node Server", () => {
  it("says hello world", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, World");
  });

  it("returns some data", async () => {
    const response = await request.get("/data");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: "Luis",
      role: "Student",
    });
  });
  it("is a bad route", async () => {
    const response = await request.get("/none");
    expect(response.status).toBe(404);
  });
  it("Has a name", async () => {
    const response = await request.get("/person/Luis");
    expect(response.status).toBe(200);
    expect(response.body.name).toMatch(/Luis/);
  });

  it("Has no name in query", async () => {
    const response = await request.get("/person/");
    expect(response.status).toBe(500);
  });
});

describe("CRUD", () => {
  let survivorTest;
  let calamityTest;

  it("Creates a survivor", async () => {
    const response = await request.post("/survivor").send({
      username: "Player 1",
      birthday: "2000-01-01T00:00:00.000Z",
      strengths: "none",
      weaknesses: "heights",
      powerLevel: 8,
    });
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      username: "Player 1",
      birthday: "2000-01-01T00:00:00.000Z",
      strengths: "none",
      weaknesses: "heights",
      powerLevel: 8,
    });
  });

  it("Creates a calamity", async () => {
    const response = await request.post("/calamity").send({
      type: "ice storm",
      intensity: 8,
      location: "Wichita, KS",
      date: "1996-01-25T00:00:00.000Z",
    });
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      type: "ice storm",
      intensity: 8,
      location: "Wichita, KS",
      date: "1996-01-25T00:00:00.000Z",
    });
  });

  it("Reads a list of survivors", async () => {
    const response = await request.get("/survivor");
    survivorTest = response.body[0];
    expect(response.status).toBe(200);
  });

  it("Reads a list of calamities", async () => {
    const response = await request.get("/calamity");
    calamityTest = response.body[0];
    expect(response.status).toBe(200);
  });

  it("Finds a(1) survivor", async () => {
    const response = await request.get(`/survivor/${survivorTest.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      username: "Player 1",
      birthday: "2000-01-01T00:00:00.000Z",
      strengths: "none",
      weaknesses: "heights",
      powerLevel: 8,
    });
  });

  it("Finds a(1) calamity", async () => {
    const response = await request.get(`/calamity/${calamityTest.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      type: "ice storm",
      intensity: 8,
      location: "Wichita, KS",
      date: "1996-01-25T00:00:00.000Z",
    });
  });

  it("Updates a survivor", async () => {
    const response = await request.put(`/survivor/${survivorTest.id}`);
    expect(response.status).toBe(200);
  });

  it("Updates an calamity", async () => {
    const response = await request.put(`/calamity/${calamityTest.id}`);
    expect(response.status).toBe(200);
  });

  it("Deletes a survivor", async () => {
    const response = await request.delete(`/survivor/${survivorTest}`);
    expect(response.status).toBe(200);
  });

  it("Deletes a calamity", async () => {
    const response = await request.delete(`/calamity/${calamityTest.id}`);
    expect(response.status).toBe(200);
  });
});
