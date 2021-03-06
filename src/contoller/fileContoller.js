const uploadFile = require("../middleware/upload");
const fs = require("fs");
require("dotenv").config();

const upload = async (req, res) => {
  try {
    await uploadFile.uploadFileMiddleware(req, res);

    if (req.file == undefined) {
      return res.status(400).send({
        status: 400,
        message: "Please upload a file!",
      });
    }

    res.status(200).send({
      status:200,
      message: "Uploaded the file successfully: " + req.fileName,
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        status:500,
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.fileName}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        status:500,
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [
      {
        status: 200,
        data: [],
      },
    ];

    files.forEach((file, index) => {
      fileInfos[0].data.push({
        fileNumber: index + 1,
        file: {
          name: file,
          url: process.env.FILE_BASEURL + "/" + file,
        },
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        status:500,
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};
