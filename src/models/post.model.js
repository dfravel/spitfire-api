import mongoose, { Schema } from 'mongoose';

const mongooseDelete = require('mongoose-delete');

const postSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Post Name is a required field'],
    },
    contact: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    postal_code: {
      type: String,
    },
    country_code: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      lng: String,
      lat: String,
    },

  },
  {
    timestamps: true,
  },
);

postSchema.plugin(mongooseDelete, {
  indexFields: ['deleted', 'deletedBy'],
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true,
});

module.exports = mongoose.model('Post', postSchema);
