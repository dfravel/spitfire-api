import mongoose, { Schema } from 'mongoose';

const mongooseDelete = require('mongoose-delete');

const vehicleInspectionSchema = new Schema(
  {
    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
    },
    inspection_type: {
      type: String,
    },
    inspection_result: {
      type: String,
    },
    inspection_personnel: {
      type: String,
    },
    approval_dt: {
      type: Date,
    },
    percent_complete: {
      type: Number,
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

vehicleInspectionSchema.plugin(mongooseDelete, {
  indexFields: ['deleted', 'deletedBy'],
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true,
});

module.exports = mongoose.model('Vehicle_Inspection', vehicleInspectionSchema);
