import mongoose, { Schema } from 'mongoose';

const mongooseDelete = require('mongoose-delete');

const vehicleDestinationSchema = new Schema(
  {
    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    actual_location: {
      type: String,
    },
    purpose: {
      type: String,
    },
    destination_dt: {
      type: Date,
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

vehicleDestinationSchema.plugin(mongooseDelete, {
  indexFields: ['deleted', 'deletedBy'],
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true,
});

module.exports = mongoose.model('Vehicle_Destination', vehicleDestinationSchema);
