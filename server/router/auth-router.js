const express = require("express"); // Requiring Router
const app = express();
const router = express.Router();
const {registerSchema, loginSchema} = require("../validators/auth-validator"); // for validations
const validate = require("../middlewares/validate-middleware"); // for validations
const authMiddleware = require("../middlewares/auth-middleware"); // User data showing

// We have stored all the modules of auth-controllers in authcontroller
const authcontrollers = require("../controllers/auth-controller");


// Home page from auth-router:
router.route("/").get(authcontrollers.home);

// Register page using Routing
// router.route("/register").post(authcontrollers.register);
router.route("/register").post(validate(registerSchema), authcontrollers.register);

router.route("/login").post(validate(loginSchema), authcontrollers.login);

// User's own page
router.route("/user").get(authMiddleware, authcontrollers.user);

module.exports = router; // We will import it in to the server.js