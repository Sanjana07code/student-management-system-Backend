const Course = require('../models/Course');

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single course
const getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({
      code: req.params.code
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create course
const createCourse = async (req, res) => {
  try {
    const {
      name,
      code,
      duration,
      students,
      department,
      status,
      description
    } = req.body;

    if (
      !name ||
      !code ||
      !duration ||
      !department
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide all required course details'
      });
    }

    const existingCourse =
      await Course.findOne({ code });

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: 'Course code already exists'
      });
    }

    const course = await Course.create({
      name,
      code,
      duration,
      students: students || 0,
      department,
      status: status || 'Active',
      description: description || ''
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const course =
      await Course.findOneAndUpdate(
        {
          code: req.params.code
        },
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const course =
      await Course.findOneAndDelete({
        code: req.params.code
      });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
};