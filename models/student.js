const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true
    },

    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
      trim: true
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true
    },

    course: {
      type: String,
      required: [true, 'Course is required'],
      trim: true
    },

    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true
    },

    semester: {
      type: String,
      required: [true, 'Semester is required'],
      trim: true
    },

    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    },

    address: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  'Student',
  studentSchema
);