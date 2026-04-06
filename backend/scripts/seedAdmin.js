import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/database.js';
import User from '../models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL || 'admin@helpdesk.com';
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'Admin@123';

    let admin = await User.findOne({ email });

    if (admin) {
      admin.username = username;
      admin.role = 'admin';
      admin.password = password;
      await admin.save();
      console.log(`Updated existing admin account: ${email}`);
    } else {
      admin = await User.create({
        username,
        email,
        password,
        role: 'admin',
      });
      console.log(`Created admin account: ${email}`);
    }

    console.log('Admin credentials:');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed admin:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedAdmin();
