const User = require('../models/User');
const Student = require('../models/student');
const Teacher = require('../models/Teacher');

const jwt = require('jsonwebtoken');


// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d'
    }
  );
};


// Register
const register = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      role
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide name, email and password'
      });
    }

    const existingUser =
      await User.findOne({
        email: email.toLowerCase()
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          'User with this email already exists'
      });
    }

    const user =
      await User.create({
        name,
        email,
        password,
        role: role || 'student'
      });

    res.status(201).json({
      success: true,
      message:
        'Registration successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// Login
const login = async (req, res) => {
  try {

    const {
      email,
      password,
      role
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide email and password'
      });
    }

    const user =
      await User.findOne({
        email: email.toLowerCase()
      });

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          'Invalid email or password'
      });
    }

    const passwordMatch =
      await user.comparePassword(
        password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message:
          'Invalid email or password'
      });
    }

    if (
      role &&
      user.role !== role
    ) {
      return res.status(403).json({
        success: false,
        message:
          `This account is registered as ${user.role}`
      });
    }

    const token =
      generateToken(user);

    res.status(200).json({
      success: true,
      message:
        'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// Get logged-in user profile
const getMe = async (req, res) => {
  try {

    const user =
      await User.findById(
        req.user.id
      ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }


    // Common profile information

    let profileData = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role:
        user.role.charAt(0).toUpperCase() +
        user.role.slice(1),
      status: 'Active'
    };


    // Student profile information

    if (user.role === 'student') {

      const student =
        await Student.findOne({
          email: user.email
        });

      if (student) {

        profileData = {
          ...profileData,
          phone: student.phone,
          studentId: student.studentId,
          course: student.course,
          department: student.department,
          semester: student.semester,
          status: student.status
        };

      }
    }


    // Teacher profile information

    if (user.role === 'teacher') {

      const teacher =
        await Teacher.findOne({
          email: user.email
        });

      if (teacher) {

        profileData = {
          ...profileData,
          phone: teacher.phone,
          teacherId: teacher.teacherId,
          department: teacher.department,
          qualification:
            teacher.qualification,
          status: teacher.status
        };

      }
    }


    res.status(200).json({
      success: true,
      user: profileData
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// Update profile
const updateProfile = async (req, res) => {
  try {

    const {
      name,
      email,
      phone,
      course,
      department,
      semester,
      qualification
    } = req.body;


    const user =
      await User.findById(
        req.user.id
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }


    // Check if email already belongs
    // to another account

    if (
      email &&
      email.toLowerCase() !== user.email
    ) {

      const existingUser =
        await User.findOne({
          email: email.toLowerCase(),
          _id: {
            $ne: user._id
          }
        });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message:
            'This email is already in use'
        });
      }
    }


    const oldEmail = user.email;


    // Update common User information

    user.name =
      name || user.name;

    user.email =
      email
        ? email.toLowerCase()
        : user.email;


    // Admin phone is stored
    // directly in User collection

    if (
      user.role === 'admin' &&
      phone !== undefined
    ) {
      user.phone = phone;
    }


    await user.save();


    // Update Student information

    if (user.role === 'student') {

      const student =
        await Student.findOne({
          email: oldEmail
        });

      if (student) {

        student.name =
          user.name;

        student.email =
          user.email;

        if (phone !== undefined) {
          student.phone = phone;
        }

        if (course !== undefined) {
          student.course = course;
        }

        if (department !== undefined) {
          student.department =
            department;
        }

        if (semester !== undefined) {
          student.semester =
            semester;
        }

        await student.save();
      }
    }


    // Update Teacher information

    if (user.role === 'teacher') {

      const teacher =
        await Teacher.findOne({
          email: oldEmail
        });

      if (teacher) {

        teacher.name =
          user.name;

        teacher.email =
          user.email;

        if (phone !== undefined) {
          teacher.phone = phone;
        }

        if (department !== undefined) {
          teacher.department =
            department;
        }

        if (qualification !== undefined) {
          teacher.qualification =
            qualification;
        }

        await teacher.save();
      }
    }


    res.status(200).json({
      success: true,
      message:
        'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role:
          user.role.charAt(0).toUpperCase() +
          user.role.slice(1)
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


module.exports = {
  register,
  login,
  getMe,
  updateProfile
};
