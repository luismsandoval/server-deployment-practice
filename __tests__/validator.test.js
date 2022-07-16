"use strict";

const { validator } = require("../src/middleware/validator");
describe("validator", () => {
  it("calls next middleware", () => {
    const res = {};
    const next = jest.fn();
    const req = {
      url: "/person/",
      params: { name: "Luis" },
    };
    validator(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
