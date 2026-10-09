const express = require('express');

const {
  getResults,
  getStudentResult,
  createResult,
  updateResult,
  deleteResult
} = require('../controllers/resultController');

const protect =
  require('../middleware/authMiddleware');

const allowRoles =
  require('../middleware/roleMiddleware');

const router = express.Router();


// View results
router.get(
  '/',
  protect,
  allowRoles('admin', 'teacher', 'student'),
  getResults
);


// View student result
router.get(
  '/:studentId',
  protect,
  allowRoles('admin', 'teacher', 'student'),
  getStudentResult
);


// Add result
router.post(
  '/',
  protect,
  allowRoles('admin', 'teacher'),
  createResult
);


// Update result
router.put(
  '/:studentId',
  protect,
  allowRoles('admin', 'teacher'),
  updateResult
);


// Delete result
router.delete(
  '/:studentId',
  protect,
  allowRoles('admin'),
  deleteResult
);

module.exports = router;