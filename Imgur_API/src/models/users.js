const mogoose = require('mongoose');

const validator = require('validator');

const userSchema = new mogoose.Schema({
  name: {
    type: String,
    required: true,
   // minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email already exists'],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  phone: {
    type: Number,
    required: true,
   // min: 10,
    unique: [true, 'Phone number already exists'],
  },
  address: {
    type: String,
    required: true,
   // minlength: 3,
  },
});

// Create new collection

const User = new mogoose.model('User', userSchema);
module.exports = User;
