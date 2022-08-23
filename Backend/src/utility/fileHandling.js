const fs = require("fs");

async function deleteFile(filePath) {
  fs.unlink(filePath, () => {});
}

module.exports = { deleteFile };
