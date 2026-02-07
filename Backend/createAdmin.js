const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Admin Schema
const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'super-admin'],
    default: 'admin'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Admin = mongoose.model('Admin', adminSchema);

async function createSampleAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@learnx.com' });
    if (existingAdmin) {
      console.log('⚠️  Sample admin already exists!');
      console.log('Email: admin@learnx.com');
      console.log('Password: Admin123');
      process.exit(0);
    }

    // Create new admin
    const admin = await Admin.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@learnx.com',
      password: 'Admin123',
      role: 'super-admin'
    });

    console.log('✅ Sample admin created successfully!');
    console.log('');
    console.log('Login Credentials:');
    console.log('Email: admin@learnx.com');
    console.log('Password: Admin123');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createSampleAdmin();
