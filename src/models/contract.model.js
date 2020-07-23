import mongoose, { Schema } from 'mongoose';

const mongooseDelete = require('mongoose-delete');

const contractSchema = new Schema(
  {

    contract_number: {
      type: String,
      required: [true, 'Contract Number is required.'],
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
    },

    number_of_vehicles: {
      type: Number,
    },

    status: {
      type: String,
      enum: ['New', 'In Process', 'Data Required', 'Delayed', 'Completed'],
      required: [true, 'Status is required'],
    },

    total_contract_value: {
      type: Number,
    },

    awarded_dt: {
      type: Date,
    },

    // setting up an array of contract line ids
    contract_lines: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract_Line',
      },
    ],
    attachments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attachment',
      },
    ],
  },
  {
    timestamps: true,
  },
);

contractSchema.plugin(mongooseDelete, {
  indexFields: ['deleted', 'deletedBy'],
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true,
});

module.exports = mongoose.model('Contract', contractSchema);
