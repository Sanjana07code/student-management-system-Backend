const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true
    },

    code: {
      type: String,
      required: [true, 'Course code is required'],
      unique: true,
      uppercase: true,
      trim: true
    },

    duration: {
      type: String,
      required: [true, 'Course duration is required'],
      trim: true
    },

    students: {
      type: Number,
      default: 0,
      min: 0
    },

    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true
    },

    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    },

    description: {
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
  'Course',
  courseSchema
);