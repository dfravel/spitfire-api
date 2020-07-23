import mongoose, { Schema } from 'mongoose';
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


const contractLineSchema = new Schema(
  {
    // in this one-to-many relationship we want to include a single contract id here
    contract_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',
    },

    // as a vehicle is added, we want to attach it to the contract line
    vehicles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
      },
    ],
    attachments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attachment',
      },
    ],

    clin: {
      type: String,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    uom: {
      type: String,
      default: 'Each',
    },

    unit_price: {
      type: String,
      default: 0,
    },

    vehicle_type: {
      type: String,
      enum: Object.values(vehicleTypes.VehicleTypes),
      default: 'Truck',
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
      default: 'Front',
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
      Default: 'Light',
    },

    interior_color: {
      type: String,
      enum: Object.values(colors.Colors),
      Default: 'Light',
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
      default: 'Front - Dark',
    }],

    engine_size: {
      type: Number,

    },

    armor_level: {
      type: String,
      enum: Object.values(armorLevels.ArmorLevels),
      default: 'B6',
    },

    tactical_package: {
      type: String,
      enum: Object.values(tacticalPackages.TacticalPackages),
      default: 'Basic',
    },

    audio_package: {
      type: String,
      enum: Object.values(audioPackages.AudioPackages),
      default: 'Standard',
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
      default: 'Automatic',
    },

    drive_side: {
      type: String,
      enum: Object.values(driveSides.DriveSides),
      default: 'RHD',
    },

    fuel_type: {
      type: String,
      enum: Object.values(fuelTypes.FuelTypes),
      default: 'Gas',
    },

    drive_type: {
      type: String,
      enum: Object.values(driveTypes.DriveTypes),
      default: '4WD',
    },

  },
  {
    timestamps: true,
  },
);

contractLineSchema.plugin(mongooseDelete, {
  indexFields: ['deleted', 'deletedBy'],
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true,
});

Object.assign(contractLineSchema.statics, {
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


module.exports = mongoose.model('Contract_Line', contractLineSchema);
