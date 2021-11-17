/* eslint-disable default-case */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const path = require('path');

// Options for file upload
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed!" }, false);
    }
  },
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  const { type } = req.body;
  // check if there is no new file to resize
  if (!req.file) {
    delete req.body.photo;
    next(); // skip to the next middleware
    return;
  }

  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.quality(80);
  photo.write(
    path.join(__dirname + `/../public/uploads/${type}/${req.body.photo}`),
    (s) => {
      console.log(s);
    },
  );
  // once we have written the photo to our filesystem, keep going!
  next();
};
