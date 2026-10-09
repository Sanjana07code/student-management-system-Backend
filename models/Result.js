const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
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

    semester: {
      type: String,
      required: [true, 'Semester is required'],
      trim: true
    },

    marks: {
      type: Number,
      required: [true, 'Marks are required'],
      min: 0
    },

    totalMarks: {
      type: Number,
      required: [true, 'Total marks are required'],
      min: 1
    },

    grade: {
      type: String,
      default: 'F'
    },

    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    status: {
      type: String,
      enum: ['Passed', 'Failed'],
      default: 'Failed'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  'Result',
  resultSchema
);