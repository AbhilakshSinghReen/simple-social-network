const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./media");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const uploadMiddleware = multer({ storage: fileStorageEngine });

module.exports = { uploadMiddleware };
