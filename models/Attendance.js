const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
      trim: true
    },

    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true
    },

    course: {
      type: String,
      required: [true, 'Course is required'],
      trim: true
    },

    month: {
      type: String,
      required: [true, 'Month is required'],
      trim: true
    },

    totalClasses: {
      type: Number,
      required: [true, 'Total classes are required'],
      min: 1
    },

    present: {
      type: Number,
      required: [true, 'Present classes are required'],
      min: 0
    },

    absent: {
      type: Number,
      required: [true, 'Absent classes are required'],
      min: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  'Attendance',
  attendanceSchema
);