const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { studentController } = require("../controllers/index");
// router
// getAllStudent
router.get("/", studentController.getAllStudents);
// getStudentById
router.get("/:id", studentController.getStudentById);
// insertStudent
router.post("/", studentController.insertStudent);
// updateStudent
router.patch("/", studentController.updateStudent)
//
router.post("/genarateFakeStudent", studentController.generateFakeStudents)
//
module.exports = router;
