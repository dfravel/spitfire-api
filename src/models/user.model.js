import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    user_type: {
      type: String,
      enum: [
        'Admin',
        'System Owner',
        'Inspector',
        'Shipper',
        'Post',
        'Dashboard',
        'Read Only',
        'Vendor',
      ],
      required: [true, 'User Type is required'],
    },
    login: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    company: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verified_dt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
