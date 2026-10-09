const Student = require('../models/student');

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: students.length,
      students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single student
const getStudent = async (req, res) => {
  try {
    const student = await Student.findOne({
      studentId: req.params.studentId
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create student
const createStudent = async (req, res) => {
  try {
    const {
      name,
      studentId,
      email,
      phone,
      course,
      department,
      semester,
      status,
      address
    } = req.body;

    if (
      !name ||
      !studentId ||
      !email ||
      !phone ||
      !course ||
      !department ||
      !semester
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide all required student details'
      });
    }

    const existingStudent =
      await Student.findOne({ studentId });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student ID already exists'
      });
    }

    const student = await Student.create({
      name,
      studentId,
      email,
      phone,
      course,
      department,
      semester,
      status: status || 'Active',
      address: address || ''
    });

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const student =
      await Student.findOneAndUpdate(
        {
          studentId: req.params.studentId
        },
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const student =
      await Student.findOneAndDelete({
        studentId: req.params.studentId
      });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
};