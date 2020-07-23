import mongoose, { Schema } from 'mongoose';

const mongooseDelete = require('mongoose-delete');

const commentSchema = new Schema(
  {
    comment: {
      type: String,
    },

    model_type: {
      type: String,
    },

    model_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

commentSchema.plugin(mongooseDelete, {
  indexFields: ['deleted', 'deletedBy'],
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true,
});

module.exports = mongoose.model('Comment', commentSchema);
