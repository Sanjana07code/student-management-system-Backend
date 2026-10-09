const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Teacher name is required'],
      trim: true
    },

    teacherId: {
      type: String,
      required: [true, 'Teacher ID is required'],
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

    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true
    },

    qualification: {
      type: String,
      required: [true, 'Qualification is required'],
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
  'Teacher',
  teacherSchema
);