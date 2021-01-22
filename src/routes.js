const express = require("express");
const UserController = require("./controllers/users");

const routes = express.Router();

routes.post("/user", UserController.createUser);
routes.post("/user/login", UserController.login);

module.exports = routes;
