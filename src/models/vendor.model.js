import mongoose, { Schema } from 'mongoose';

const mongooseDelete = require('mongoose-delete');

const vendorSchema = new Schema(
  {
    vendor_type: {
      type: String,
      enum: ['Manufacturer', 'Shipper'],
      required: [true, 'Vendor Type is required'],
    },
    name: {
      type: String,
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
  },
  {
    timestamps: true,
  },
);

vendorSchema.plugin(mongooseDelete, {
  indexFields: ['deleted', 'deletedBy'],
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true,
});

module.exports = mongoose.model('Vendor', vendorSchema);
