const multer = require("multer");

const upload = multer({
  dest: "uploads/", // temp folder
});

module.exports = upload;