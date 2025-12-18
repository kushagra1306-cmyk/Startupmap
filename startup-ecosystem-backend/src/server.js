const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Database
const { connectDB } = require('./config/database');

// Middleware
const errorHandler = require('./middleware/errorHandler');

// Routes
const authRoutes = require('./routes/auth');
const businessRoutes = require('./routes/business');
const collaborationRoutes = require('./routes/collaboration');
const notificationRoutes = require('./routes/notification');

const app = express();

// --------------------
// Global Middleware
// --------------------
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://claude.ai'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// API Routes
// --------------------
app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/collaborations', collaborationRoutes);
app.use('/api/notifications', notificationRoutes);

// --------------------
// Health Check
// --------------------
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    time: new Date().toISOString()
  });
});

// --------------------
// Error Handler
// --------------------
app.use(errorHandler);

// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  });