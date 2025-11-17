const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const characterRoutes = require('./routes/characters');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// MongoDB connection string
const connectionString = "mongodb+srv://skillSpireUser:skillSpirePassword@mongodbassignment1clust.ujnqvw8.mongodb.net/characterDB?retryWrites=true&w=majority&appName=MongoDBAssignment1Cluster";

// Connect to MongoDB
mongoose.connect(connectionString)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/characters', characterRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
