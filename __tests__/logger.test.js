"use strict";

const { logger } = require("../src/middleware/logger");

describe("Logger", () => {
  it("runs console.log", () => {
    jest.spyOn(console, "log").mockImplementation();

    const req = { method: "GET", url: "/" };
    const res = {};
    const next = () => {};

    logger(req, res, next);

    expect(console.log).toHaveBeenCalledWith("GET", "/");
  });

  it("calls next", () => {
    const req = { method: "GET", url: "/" };
    const res = {};
    const next = jest.fn();
    logger(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
