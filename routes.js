const { Router } = require("express");
const userController = require("./controllers/userController");

const routes = Router();

//Store User
routes.post("/users/register", userController.store);
//User Login
routes.post("/users/login", userController.login);

module.exports = routes;
