import mongoose, { Schema } from 'mongoose';

const mongooseDelete = require('mongoose-delete');

const vehicleShippingSchema = new Schema(
  {
    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
    },

    shipment_method: {
      type: String,
    },
    destination_city: {
      type: String,
    },
    destination_country: {
      type: String,
    },
    carrier_vessel: {
      type: String,
    },
    container_number: {
      type: String,
    },
    pickup_address: {
      type: String,
    },
    consignor_sponsor: {
      type: String,
    },
    delivery_address: {
      type: String,
    },
    consignee_contact_info: {
      type: String,
    },
    movement_type: {
      type: String,
    },
    special_instructions: {
      type: String,
    },
    number_of_pallets: {
      type: String,
    },
    pallet_size_dimensions: {
      type: String,
    },
    planned_ship_dt: {
      type: Date,
    },
    planned_arrival_dt: {
      type: Date,
    },
    customs_status: {
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

vehicleShippingSchema.plugin(mongooseDelete, {
  indexFields: ['deleted', 'deletedBy'],
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true,
});

module.exports = mongoose.model('Vehicle_Shipping', vehicleShippingSchema);
