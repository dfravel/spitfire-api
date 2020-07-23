import mongoose, { Schema } from 'mongoose';

const mongooseDelete = require('mongoose-delete');

const attachmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Attachment Name is a required field'],
    },

    description: {
      type: String,
    },

    model_type: {
      type: String,
    },

    model_id: {
      type: String,
    },

    file_name: {
      type: String,
    },

    file_path: {
      type: String,
    },

    file_type: {
      type: String,
    },

    file_size: {
      type: Number,
    },


  },
  {
    timestamps: true,
  },
);

attachmentSchema.plugin(mongooseDelete, {
  indexFields: ['deleted', 'deletedBy'],
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true,
});

module.exports = mongoose.model('Attachment', attachmentSchema);
