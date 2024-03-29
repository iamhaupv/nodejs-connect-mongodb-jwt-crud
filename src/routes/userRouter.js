const express = require("express");
const { body, validationResult } = require("express-validator");
const { userController } = require("../controllers/index");
const router = express.Router();
// router
router.get("/:id", userController.getDetailUser);
// login
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  userController.login
);
// register
router.post("/register",  userController.register);

module.exports = router;
