import reader from "./config/reader";

function pipeTheFile(file, folder, res, req) {
  res.set("Content-Type", mime.lookup(file.actualExtension));
  reader(file.fileName, folder, res);
}

module.exports = pipeTheFile;
