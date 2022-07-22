"use strict";

const validator = (req, res, next) => {
  if (req.params.name) {
    next();
  } else {
    throw new Error("Empty string on query for name propery");
  }
};

module.exports = {
  validator,
};
