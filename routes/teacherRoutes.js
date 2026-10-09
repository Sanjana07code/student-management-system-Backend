const express = require('express');

const {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher
} = require('../controllers/teacherController');

const protect =
  require('../middleware/authMiddleware');

const allowRoles =
  require('../middleware/roleMiddleware');

const router = express.Router();


// View teachers
router.get(
  '/',
  protect,
  allowRoles('admin', 'teacher'),
  getTeachers
);


// View single teacher
router.get(
  '/:teacherId',
  protect,
  allowRoles('admin', 'teacher'),
  getTeacher
);


// Add teacher
router.post(
  '/',
  protect,
  allowRoles('admin'),
  createTeacher
);


// Update teacher
router.put(
  '/:teacherId',
  protect,
  allowRoles('admin'),
  updateTeacher
);


// Delete teacher
router.delete(
  '/:teacherId',
  protect,
  allowRoles('admin'),
  deleteTeacher
);

module.exports = router;