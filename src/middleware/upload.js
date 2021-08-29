const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let fileName = Date.now().toString();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, fileName + ".txt");
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = {uploadFileMiddleware,fileName};
