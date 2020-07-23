/* eslint-disable no-underscore-dangle */
/* eslint-disable no-lonely-if */
/* eslint-disable no-console */
/*
Note to future developers .... this was put together quickly and doesn't have
the same coding style as the rest of the API. It wil need a decent amount of
refactoring, but for MVP/Demo purposes it should work. If I had another week (20+ hours)
I think I could have made this better

-- Dave Fravel 2020 Feb 7
*/

import Vehicle from '../models/vehicle.model';
import VehicleInspection from '../models/vehicle_inspection.model';
import VehicleMaintenance from '../models/vehicle_maintenance.model';
import Attachment from '../models/attachment.model';
import logger from '../configs/winston.config';

const mongoose = require('mongoose');
const express = require('express');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');


const router = express.Router();

const s3 = new aws.S3({
  accessKeyId: 'AKIAJN4P57PNYV2YNKPQ',
  secretAccessKey: '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',
  region: 'us-east-1',
});

const vehicleImageUpload = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: 'spitfire-ui-uploads',
    key(req, file, cb) {
      cb(null, `${path.basename(file.originalname, path.extname(file.originalname))}-${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter(req, file, cb) {
    // eslint-disable-next-line no-use-before-define
    checkFileType(file, cb);
  },
}).single('vehicleImage');

const attachmentInsert = async (req, modelType, modelId) => {
  const convertedId = mongoose.Types.ObjectId(modelId);
  const insertAttachment = new Attachment({
    name: req.originalname || 'Uploaded File Name',
    description: req.description || 'Uploaded File Description',
    model_type: modelType,
    model_id: convertedId,
    file_path: req.location,
    file_name: req.originalname,
    file_size: req.size,
  });

  const newAttachment = await Attachment.create(insertAttachment);

  logger.info(`the model type is ${modelType}`);
  logger.info(`the model id is ${modelId}`);
  logger.info(`the new attachment id is ${newAttachment._id}`);

  // we need to write the new attachment id into the related table
  if (modelType === 'vehicle') {
    logger.info('here I am');
    await Vehicle.findOneAndUpdate(
      { _id: convertedId },
      { $push: { attachments: newAttachment._id } },
      { new: true },
    );
  }

  if (modelType === 'inspection') {
    logger.info('here I am at inspections');
    await VehicleInspection.findOneAndUpdate(
      { _id: convertedId },
      { $push: { attachments: newAttachment._id } },
      { new: true },
    );
  }

  if (modelType === 'maintenance') {
    logger.info('here I am at inspections');
    await VehicleMaintenance.findOneAndUpdate(
      { _id: convertedId },
      { $push: { attachments: newAttachment._id } },
      { new: true },
    );
  }
};


// once the vehicle image has been uploaded, we need to assign it to the actual vehicle
const vehicleImageInsert = async (vehicleId, attachment) => {
  const updateVehicle = await Vehicle.findByIdAndUpdate(vehicleId,
    { $set: { vehicle_image: attachment } }, { new: true });
  return updateVehicle;
};


// eslint-disable-next-line consistent-return
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: Images Only!');
}


router.post('/vehicle/:id', (req, res) => {
  const vehicleId = req.params.id;

  vehicleImageUpload(req, res, (error) => {
    if (error) {
      res.json({ error });
    } else {
      if (req.file === undefined) {
        res.json('Error: No File Selected');
      } else {
        const imageName = req.file.key;
        const imageLocation = req.file.location;

        vehicleImageInsert(vehicleId, imageLocation);
        attachmentInsert(req.file, 'vehicle', vehicleId);

        res.json({
          image: imageName,
          location: imageLocation,
          otherInfo: req.file,
        });
      }
    }
  });
});


// Multiple File Uploads ( max 5. 10mb file size )
const fileUploads = multer({
  storage: multerS3({
    s3,
    bucket: 'spitfire-ui-uploads',
    acl: 'public-read',
    key(req, file, cb) {
      cb(null, `${path.basename(file.originalname, path.extname(file.originalname))}-${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
  limits: { fileSize: 10000000 }, // In bytes: 2000000 bytes = 2 MB
}).array('files', 5);


router.post('/multiple/:model/:id', (req, res) => {
  const modelId = req.params.id;
  const modelType = req.params.model;


  fileUploads(req, res, (error) => {
    if (error) {
      res.json({ error });
    } else {
      if (req.files === undefined) {
        res.json('Error: No File Selected');
      } else {
        const fileArray = req.files;
        let fileLocation;
        const fileLocationArray = [];
        for (let i = 0; i < fileArray.length; i++) {
          // insert each file into the attachments table
          attachmentInsert(fileArray[i], modelType, modelId);

          fileLocation = fileArray[i].location;
          fileLocationArray.push(fileLocation);
        }
        // Save the file name into database
        res.json({
          filesArray: fileArray,
          locationArray: fileLocationArray,
        });
      }
    }
  });
});

module.exports = router;
