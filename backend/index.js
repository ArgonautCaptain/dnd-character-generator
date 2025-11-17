require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const characterRoutes = require('./routes/characters');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB connection string (from .env)
const connectionString = process.env.MONGO_URI;

if (!connectionString) {
  console.error("❌ ERROR: MONGO_URI not found in environment variables.");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(connectionString)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// Routes
app.use('/api/characters', characterRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
