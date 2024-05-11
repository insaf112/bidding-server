const multer = require("multer");
const path = require("path");
// Image Multer Middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Multer File", file);

    cb(null, `./uploads`);
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "." + file.mimetype.split("/")[1];
    console.log("Multer Filenameeeeeeeee ", filename);
    cb(null, filename);
  },
});
// For Array of Files
const storageMultiple = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Multer File", file);
    cb(null, "./uploads"); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const uploadMulti = multer({ storage: storageMultiple });
module.exports = { upload, uploadMulti };
