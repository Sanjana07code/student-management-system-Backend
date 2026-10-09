const Teacher = require('../models/Teacher');

// Get all teachers
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: teachers.length,
      teachers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single teacher
const getTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      teacherId: req.params.teacherId
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.status(200).json({
      success: true,
      teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create teacher
const createTeacher = async (req, res) => {
  try {
    const {
      name,
      teacherId,
      email,
      phone,
      department,
      qualification,
      status,
      address
    } = req.body;

    if (
      !name ||
      !teacherId ||
      !email ||
      !phone ||
      !department ||
      !qualification
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide all required teacher details'
      });
    }

    const existingTeacher =
      await Teacher.findOne({ teacherId });

    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: 'Teacher ID already exists'
      });
    }

    const teacher = await Teacher.create({
      name,
      teacherId,
      email,
      phone,
      department,
      qualification,
      status: status || 'Active',
      address: address || ''
    });

    res.status(201).json({
      success: true,
      message: 'Teacher created successfully',
      teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update teacher
const updateTeacher = async (req, res) => {
  try {
    const teacher =
      await Teacher.findOneAndUpdate(
        {
          teacherId: req.params.teacherId
        },
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Teacher updated successfully',
      teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete teacher
const deleteTeacher = async (req, res) => {
  try {
    const teacher =
      await Teacher.findOneAndDelete({
        teacherId: req.params.teacherId
      });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Teacher deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher
};