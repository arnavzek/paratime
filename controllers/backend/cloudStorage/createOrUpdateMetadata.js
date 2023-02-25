import File from "../../../database/models/File";
import path from "path";
import deleter from "./config/deleter";

async function createOrUpdateMetadata({ req, newFileName }) {
  let file = req.file;
  let fileToUpdate = req.fileToUpdate;

  if (fileToUpdate) {
    let oldFile = await File.findOne({ fileName: fileToUpdate });
    if (!oldFile)
      throw new Error("File can't be replaced because it does not exists");

    req.previousFileSize = oldFile.size;
    await deleter(fileToUpdate);
    return await updateTheOldFileMetaData();
  } else {
    return await createNewMetaData();
  }

  async function updateTheOldFileMetaData() {
    return await File.findOneAndUpdate(
      { fileName: fileToUpdate },
      {
        fileName: newFileName,
        size: file.size,
        authorID: req.user._id,
        actualExtension: path.extname(file.originalname),
      }
    );
  }

  async function createNewMetaData() {
    let newFileMeta = new File();
    newFileMeta.actualExtension = path.extname(file.originalname);
    newFileMeta.fileName = newFileName;
    newFileMeta.size = file.size;
    newFileMeta.authorID = req.user._id;
    await newFileMeta.save();
  }
}

export default createOrUpdateMetadata;
