/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import Attachment from '../models/attachment.model';
import logger from '../configs/winston.config';

const mongoose = require('mongoose');
const s3 = require('../configs/s3.config.js');

const upload = (req) => {
  logger.info(`the request that we're passing in is ${req.file}`);
  const { s3Client } = s3;

  const params = s3.uploadParams;
  params.Key = req.file.originalname;
  params.Body = req.file.buffer;

  s3Client.upload(params, (err, data) => {
    if (err) {
      logger.error(`An error occurred in the upload process: ${err}`);
    }

    if (data) {
      fs.unlinkSync(req.file.path); // Empty temp folder
      const locationUrl = data.Location;

      const convertedId = mongoose.Types.ObjectId(req._id);
      const insertAttachment = new Attachment({
        name: req.body.name || 'Uploaded File Name',
        description: req.body.description,
        model_type: req.body.model_type,
        model_id: convertedId,
        file_path: locationUrl,

      });


      const newAttachment = Attachment.create(insertAttachment);
      logger.info(`the new attachment has been inserted. the information is ${newAttachment}`);
      return newAttachment;
    }
  });
};


module.exports = {
  upload,
};
