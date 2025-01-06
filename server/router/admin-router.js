const express = require("express");
const {getAllusers, getAllContacts} = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.route('/users').get(authMiddleware, getAllusers);
router.route('/contacts').get(authMiddleware,  getAllContacts);

// router.route('/users/delete/:userId').delete(authMiddleware, getAllusers.deleteUserById );

module.exports = router;  // No matter please please do not forget this line


// Protect this route with admin authorization middleware (if applicable)

