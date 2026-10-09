const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const courseRoutes = require('./routes/courseRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const resultRoutes = require('./routes/resultRoutes');

// Error Middleware
const {
  notFound,
  errorHandler
} = require('./middleware/errorMiddleware');

const app = express();

// ===============================
// Middleware
// ===============================

app.use(cors());

app.use(express.json());


// ===============================
// API Routes
// ===============================

app.use('/api/auth', authRoutes);

app.use('/api/students', studentRoutes);

app.use('/api/teachers', teacherRoutes);

app.use('/api/courses', courseRoutes);

app.use('/api/attendance', attendanceRoutes);

app.use('/api/results', resultRoutes);


// ===============================
// Root Route
// ===============================

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Student Management System API is running'
  });
});


// ===============================
// Error Handling
// ===============================

app.use(notFound);

app.use(errorHandler);


// ===============================
// Start Server
// ===============================

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error(
      'Server failed to start:',
      error.message
    );

    process.exit(1);
  }
};

startServer();