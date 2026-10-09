const Attendance = require('../models/Attendance');

// Get all attendance records
const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get attendance for one student
const getStudentAttendance = async (req, res) => {
  try {
    const attendance =
      await Attendance.findOne({
        studentId: req.params.studentId
      });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    res.status(200).json({
      success: true,
      attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Create attendance
const createAttendance = async (req, res) => {
  try {
    const {
      studentId,
      studentName,
      course,
      month,
      totalClasses,
      present,
      absent
    } = req.body;

    if (
      !studentId ||
      !studentName ||
      !course ||
      !month ||
      totalClasses === undefined ||
      present === undefined ||
      absent === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide all attendance details'
      });
    }

    if (present > totalClasses) {
      return res.status(400).json({
        success: false,
        message:
          'Present classes cannot be greater than total classes'
      });
    }

    if (absent > totalClasses) {
      return res.status(400).json({
        success: false,
        message:
          'Absent classes cannot be greater than total classes'
      });
    }

    const existingAttendance =
      await Attendance.findOne({ studentId });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message:
          'Attendance record already exists for this student'
      });
    }

    const attendance =
      await Attendance.create({
        studentId,
        studentName,
        course,
        month,
        totalClasses,
        present,
        absent
      });

    res.status(201).json({
      success: true,
      message:
        'Attendance created successfully',
      attendance
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Update attendance
const updateAttendance = async (req, res) => {
  try {
    const {
      studentName,
      course,
      totalClasses,
      present,
      absent
    } = req.body;

    if (
      totalClasses !== undefined &&
      present !== undefined &&
      present > totalClasses
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Present classes cannot be greater than total classes'
      });
    }

    if (
      totalClasses !== undefined &&
      absent !== undefined &&
      absent > totalClasses
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Absent classes cannot be greater than total classes'
      });
    }

    const attendance =
      await Attendance.findOneAndUpdate(
        {
          studentId: req.params.studentId
        },
        {
          studentName,
          course,
          totalClasses,
          present,
          absent
        },
        {
          new: true,
          runValidators: true
        }
      );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message:
          'Attendance record not found'
      });
    }

    res.status(200).json({
      success: true,
      message:
        'Attendance updated successfully',
      attendance
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Delete attendance
const deleteAttendance = async (req, res) => {
  try {
    const attendance =
      await Attendance.findOneAndDelete({
        studentId: req.params.studentId
      });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message:
          'Attendance record not found'
      });
    }

    res.status(200).json({
      success: true,
      message:
        'Attendance deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  getAttendance,
  getStudentAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance
};