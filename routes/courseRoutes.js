const express = require('express');

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

const protect =
  require('../middleware/authMiddleware');

const allowRoles =
  require('../middleware/roleMiddleware');

const router = express.Router();


// View courses
router.get(
  '/',
  protect,
  allowRoles('admin', 'teacher', 'student'),
  getCourses
);


// View single course
router.get(
  '/:code',
  protect,
  allowRoles('admin', 'teacher', 'student'),
  getCourse
);


// Add course
router.post(
  '/',
  protect,
  allowRoles('admin'),
  createCourse
);


// Update course
router.put(
  '/:code',
  protect,
  allowRoles('admin'),
  updateCourse
);


// Delete course
router.delete(
  '/:code',
  protect,
  allowRoles('admin'),
  deleteCourse
);

module.exports = router;