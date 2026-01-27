const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// Increase limit for Base64 images
app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nik_construction')
.then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
const contentRoutes = require('./routes/content');
const uploadRoutes = require('./routes/upload');
const authRoutes = require('./routes/auth');

app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
