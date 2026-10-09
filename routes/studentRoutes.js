const express = require('express');

const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

const protect =
  require('../middleware/authMiddleware');

const allowRoles =
  require('../middleware/roleMiddleware');

const router = express.Router();


// View students
router.get(
  '/',
  protect,
  allowRoles('admin', 'teacher'),
  getStudents
);


// View single student
router.get(
  '/:studentId',
  protect,
  allowRoles('admin', 'teacher'),
  getStudent
);


// Add student
router.post(
  '/',
  protect,
  allowRoles('admin'),
  createStudent
);


// Update student
router.put(
  '/:studentId',
  protect,
  allowRoles('admin'),
  updateStudent
);


// Delete student
router.delete(
  '/:studentId',
  protect,
  allowRoles('admin'),
  deleteStudent
);

module.exports = router;