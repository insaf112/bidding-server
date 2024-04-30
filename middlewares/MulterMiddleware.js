const multer = require("multer");

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

const upload = multer({ storage: storage });
module.exports = { upload };
