const express = require("express"); // Requiring Router
const router = express.Router();
const contactForm = require("../controllers/contact-controller")

// Contact page from auth-router:
router.route("/contact").post(contactForm);

module.exports = router; // We will import it in to the server.js