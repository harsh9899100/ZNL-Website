require("dotenv").config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // for password hashing
const jwt = require("jsonwebtoken"); // for JSON web token

// User schema ---------------------------------------------
// Validation will be in the validators>auth-validators.js
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // validate: {
    //   validator: (email) => /\S+@\S+\.\S+/.test(email),
    //   message: 'Please enter a valid email address',
    // },
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  country: {
    type: String,
  },
  termsAccepted: {
    type: Boolean,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false, // Users are not admins by default
  },
}, { timestamps: true }); // Add timestamps for creation and update

// Hash password before saving user.....................
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10); // More Salt rounds => more Complex + time consuming
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// compare the password while login.....................
userSchema.methods.comparePassword = async function (password) {
  console.log("Provided password:", password);
  console.log("Hashed password:", this.password);
  return bcrypt.compare(password, this.password);
}


// JSON Web Tokens ......................................
userSchema.methods.generateToken = function(){
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn:"30d",
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error('Failed to generate token');
  }
};


module.exports = mongoose.model('User', userSchema);
