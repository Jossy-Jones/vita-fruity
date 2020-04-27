
/**
* @author Clinton Nzedimma
* File upload middleware
*/


const { uuid } = require('uuidv4');
const multer = require("multer");
const sharp = require("sharp");
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const formDataName = "img";
const uploadFiles = upload.array(formDataName, 10); // limit to 10 images




module.exports.uploadImages = (req, res, next) => {
  uploadFiles(req, res, err => {
    if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
      if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
        // ...
      }
    } else if (err) {
      // handle other errors
    }

    // Everything is ok.
    next();
  });
};



module.exports.resizeImages = async (req, res, next) => {
  if (!req.files) return next();


  let publicSubPath = req.session.uploadPath; // desired public path
  let imgQuality = req.session.imgQuality;

  console.log(req.session.uploadPath);
  req.body.images = [];
  await Promise.all(
    req.files.map(async file => {
      const newFilename = `vitafruity-${uuid()}.jpeg`;

      await sharp(file.buffer)
        .resize(640, 320)
        .toFormat("jpeg")
        .jpeg({ quality: imgQuality })
        .toFile(`public/${publicSubPath}/${newFilename}`);

      req.body.images.push(newFilename);
    })
  );


  

  delete req.session.uploadPath;
  delete req.session.imgQuality;
  req.session.save();
  next();
};

module.exports.getResult = async (req, res) => {
  if (req.body.images.length <= 0) {
    return res.send(`You must select at least 1 image.`);
  }

  const images = req.body.images
    .map(image => "" + image + "")
    .join("");

  return res.send(`Images were uploaded:${images}`);
};
