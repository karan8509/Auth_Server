const express = require("express");
const routes = express.Router();
const {
  signup,
  login,
  forgot,
  reset,
} = require("../controllers/user.route.controller");

routes.post("/signup", signup);
routes.post("/login", login);
routes.post("/forgot-link", forgot);
routes.put("/reset/:id", reset);

module.exports = routes;
