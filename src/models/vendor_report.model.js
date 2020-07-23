import mongoose, { Schema } from 'mongoose';

const mongooseDelete = require('mongoose-delete');

const vendorReportSchema = new Schema(
  {
    vendor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
    },

    contract_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',
    },

    report_dt: {
      type: Date,
    },

    report: {
      type: String,
    },

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

vendorReportSchema.plugin(mongooseDelete, {
  indexFields: ['deleted', 'deletedBy'],
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true,
});

module.exports = mongoose.model('VendorReport', vendorReportSchema);
