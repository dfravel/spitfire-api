import mongoose, { Schema } from 'mongoose';

const mongooseDelete = require('mongoose-delete');

const vehicleMaintenanceSchema = new Schema(
  {
    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
    },
    maintenance_process: {
      type: String,
    },
    description: {
      type: String,
    },
    required_dt: {
      type: Date,
    },
    completed_dt: {
      type: Date,
    },
    technician: {
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

vehicleMaintenanceSchema.plugin(mongooseDelete, {
  indexFields: ['deleted', 'deletedBy'],
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true,
});

module.exports = mongoose.model('Vehicle_Maintenance', vehicleMaintenanceSchema);
