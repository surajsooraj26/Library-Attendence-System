const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const adminController = require("../controllers/adminController");
const routeController = require("../controllers/routeController");
const logController = require("../controllers/logController");

router.post("/register", adminController.adminRegistration);

router.get("/dashboard", routeController.loadDashboard);
router.get("/allstudents", studentController.allStudents);
router.post("/dashboard/students", studentController.addStudent);
router.post("/student/register", studentController.addStudent);
router.post("/login", adminController.adminLogin);
router.post("/log", logController.activityLog);
router.get("/log/:id", logController.dashboardLog);
router.post("/all_log", logController.allLog);
router.post("/total", logController.totalLog);
router.put("/editUser", studentController.updateUser);
router.delete("/deleteUser/:regNo", studentController.deleteUser);
router.post("/disableUser", studentController.disableUser);
module.exports = router;