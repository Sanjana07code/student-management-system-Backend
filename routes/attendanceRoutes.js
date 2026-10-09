const express = require('express');

const {
  getAttendance,
  getStudentAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance
} = require('../controllers/attendanceController');

const protect =
  require('../middleware/authMiddleware');

const allowRoles =
  require('../middleware/roleMiddleware');

const router = express.Router();


// View attendance
router.get(
  '/',
  protect,
  allowRoles('admin', 'teacher', 'student'),
  getAttendance
);


// View student attendance
router.get(
  '/:studentId',
  protect,
  allowRoles('admin', 'teacher', 'student'),
  getStudentAttendance
);


// Add attendance
router.post(
  '/',
  protect,
  allowRoles('admin', 'teacher'),
  createAttendance
);


// Update attendance
router.put(
  '/:studentId',
  protect,
  allowRoles('admin', 'teacher'),
  updateAttendance
);


// Delete attendance
router.delete(
  '/:studentId',
  protect,
  allowRoles('admin'),
  deleteAttendance
);

module.exports = router;