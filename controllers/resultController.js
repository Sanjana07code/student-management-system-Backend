const Result = require('../models/Result');

// Calculate grade
const calculateGrade = (marks, totalMarks) => {
  const percentage =
    (marks / totalMarks) * 100;

  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';

  return 'F';
};

// Get all results
const getResults = async (req, res) => {
  try {
    const results = await Result.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: results.length,
      results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get result for one student
const getStudentResult = async (req, res) => {
  try {
    const result = await Result.findOne({
      studentId: req.params.studentId
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found'
      });
    }

    res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create result
const createResult = async (req, res) => {
  try {
    const {
      studentId,
      studentName,
      course,
      semester,
      marks,
      totalMarks
    } = req.body;

    if (
      !studentId ||
      !studentName ||
      !course ||
      !semester ||
      marks === undefined ||
      totalMarks === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide all result details'
      });
    }

    if (totalMarks <= 0) {
      return res.status(400).json({
        success: false,
        message:
          'Total marks must be greater than zero'
      });
    }

    if (marks < 0 || marks > totalMarks) {
      return res.status(400).json({
        success: false,
        message:
          'Marks must be between 0 and total marks'
      });
    }

    const existingResult =
      await Result.findOne({
        studentId
      });

    if (existingResult) {
      return res.status(400).json({
        success: false,
        message:
          'Result already exists for this student'
      });
    }

    const grade = calculateGrade(
      marks,
      totalMarks
    );

    const percentage =
      (marks / totalMarks) * 100;

    const status =
      percentage >= 40
        ? 'Passed'
        : 'Failed';

    const result = await Result.create({
      studentId,
      studentName,
      course,
      semester,
      marks,
      totalMarks,
      grade,
      percentage: Math.round(percentage),
      status
    });

    res.status(201).json({
      success: true,
      message: 'Result created successfully',
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update result
const updateResult = async (req, res) => {
  try {
    const {
      marks,
      totalMarks
    } = req.body;

    const updateData = {
      ...req.body
    };

    if (
      marks !== undefined &&
      totalMarks !== undefined
    ) {
      if (totalMarks <= 0) {
        return res.status(400).json({
          success: false,
          message:
            'Total marks must be greater than zero'
        });
      }

      if (
        marks < 0 ||
        marks > totalMarks
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Marks must be between 0 and total marks'
        });
      }

      const grade = calculateGrade(
        marks,
        totalMarks
      );

      const percentage =
        (marks / totalMarks) * 100;

      updateData.grade = grade;
      updateData.percentage =
        Math.round(percentage);

      updateData.status =
        percentage >= 40
          ? 'Passed'
          : 'Failed';
    }

    const result =
      await Result.findOneAndUpdate(
        {
          studentId:
            req.params.studentId
        },
        updateData,
        {
          new: true,
          runValidators: true
        }
      );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Result updated successfully',
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete result
const deleteResult = async (req, res) => {
  try {
    const result =
      await Result.findOneAndDelete({
        studentId: req.params.studentId
      });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Result deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getResults,
  getStudentResult,
  createResult,
  updateResult,
  deleteResult
};