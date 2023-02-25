import generateFileName from "./generateFileName";
import uploader from "./config/uploader";
import createOrUpdateMetaData from "./createOrUpdateMetadata";
import captureStorageUsage from "../captureStorageUsage";
import isFileAuthor from "../isFileAuthor";

async function cloudStorageUpload(req, res, next) {
  if (!req.file)
    return next("file was not uploaded due to an unexpected error");

  if (req.body.fileToUpdate) {
    let isAuthor = await isFileAuthor(req.body.fileToUpdate, req);
    if (!isAuthor) throw Error("Access Denied");
  }

  try {
    let newFileName = await generateFileName(req);
    await processUpload(newFileName);
  } catch (e) {
    next(e);
  }

  async function processUpload(newFileName) {
    await createOrUpdateMetaData({ req, newFileName: newFileName });

    let file = req.file;

    if (!req.previousFileSize) req.previousFileSize = 0;
    let incrementInFileSize = file.size - req.previousFileSize;
    captureStorageUsage(req, incrementInFileSize);

    try {
      const myFile = req.file;
      await uploader(myFile, newFileName);

      res.json({
        data: {
          fileName: newFileName,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = cloudStorageUpload;
