import mongoose, { Schema } from 'mongoose';
import statuses from './enums/vehicle_statuses.enum';
import armorLevels from './enums/armor_levels.enum';
import audioPackages from './enums/audio_packages.enum';
import tacticalPackages from './enums/tactical_packages.enum';
import vehicleTypes from './enums/vehicle_types.enum';
import colors from './enums/colors.enum';
import transmissions from './enums/transmissions.enum';
import driveSides from './enums/drive_sides.enum';
import fuelTypes from './enums/fuel_types.enum';
import driveTypes from './enums/drive_types.enum';
import airbagConfigs from './enums/airbag_configs.enum';
import glassTintings from './enums/glass_tintings.enum';

const mongooseDelete = require('mongoose-delete');

const vehicleSchema = new Schema(
  {

    contract_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',
    },

    contract_line_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract_Line',
    },

    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },

    vehicle_image: {
      type: String,
    },


    // a single attachment will be used to hold onto the photo
    photo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attachment',
    },

    vin: {
      type: String,
    },

    customer_vehicle_number: {
      type: String,
    },

    contract_received_dt: {
      type: Date,
    },

    build_start_dt: {
      type: Date,
    },

    percent_complete: {
      type: Number,
    },

    status: {
      type: String,
      enum: Object.values(statuses.VehicleStatuses),
      default: 'Ordered',
    },

    vehicle_type: {
      type: String,
      enum: Object.values(vehicleTypes.VehicleTypes),
    },

    make: {
      type: String,
    },

    model: {
      type: String,
    },

    model_year: {
      type: Number,
    },

    trim_package: {
      type: String,
    },

    airbag_config: [{
      type: String,
      enum: Object.values(airbagConfigs.AirbagConfigs),
    }],

    curb_weight: {
      type: Number,
    },

    gross_weight: {
      type: Number,
    },

    exterior_color: {
      type: String,
      enum: Object.values(colors.Colors),
    },

    interior_color: {
      type: String,
      enum: Object.values(colors.Colors),
    },

    number_of_doors: {
      type: Number,
      min: 1,
      max: 8,

    },

    number_of_seats: {
      type: Number,
      min: 2,
      max: 20,

    },

    glass_tinting: [{
      type: String,
      enum: Object.values(glassTintings.GlassTintings),
    }],

    engine_size: {
      type: Number,

    },

    armor_level: {
      type: String,
      enum: Object.values(armorLevels.ArmorLevels),
    },

    tactical_package: {
      type: String,
      enum: Object.values(tacticalPackages.TacticalPackages),
    },

    audio_package: {
      type: String,
      enum: Object.values(audioPackages.AudioPackages),
    },

    abs: {
      type: Boolean,
      default: true,
    },

    spare_parts_kits: {
      type: Number,
      min: 1,
      max: 5,

    },

    transmission: {
      type: String,
      enum: Object.values(transmissions.Transmissions),
    },

    drive_side: {
      type: String,
      enum: Object.values(driveSides.DriveSides),
    },

    fuel_type: {
      type: String,
      enum: Object.values(fuelTypes.FuelTypes),
    },

    drive_type: {
      type: String,
      enum: Object.values(driveTypes.DriveTypes),
    },

    mileage: [
      {
        miles: Number,
        reported_dt: Date,
      },
    ],

    shipping: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle_Shipping',
      },
    ],

    destinations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle_Destination',
      },
    ],

    inspections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle_Inspection',
      },
    ],

    maintenance: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle_Maintenance',
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

vehicleSchema.plugin(mongooseDelete, {
  indexFields: ['deleted', 'deletedBy'],
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true,
});

Object.assign(vehicleSchema.statics, {
  statuses,
  armorLevels,
  driveTypes,
  driveSides,
  audioPackages,
  tacticalPackages,
  colors,
  fuelTypes,
  transmissions,
  vehicleTypes,
  airbagConfigs,
  glassTintings,
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
