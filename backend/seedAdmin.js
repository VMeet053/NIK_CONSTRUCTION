const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nik_construction');
    console.log('MongoDB Connected for Seeding Admin');

    const username = 'Kirticonstruction';
    const password = 'Kirticonstruction@2025';

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        // Update password if exists
        existingUser.password = password;
        await existingUser.save();
        console.log('Admin user updated');
    } else {
        // Create new user
        const newUser = new User({ username, password });
        await newUser.save();
        console.log('Admin user created');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding admin:', error);
    mongoose.connection.close();
  }
};

seedAdmin();
