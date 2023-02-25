import deleter from "./config/deleter";
import isFileAuthor from "../isFileAuthor";
import captureStorageUsage from "../captureStorageUsage";
import File from "../../../database/models/File";

function deleteFile(req, res, next) {
  let fileName = req.body.fileName;

  if (!req.body) return next("You need to log in");
  isFileAuthor(fileName, req).then(doDeletion).catch(next);

  async function doDeletion() {
    let fileData = await File.findOne({ fileName: fileName });
    await captureStorageUsage(req, -fileData.size);
    await File.deleteOne({ fileName: fileName });
    try {
      await deleter(req.body.fileName);
      res.json({ data: { success: true } });
    } catch (e) {
      next(e);
    }
  }
}

export default deleteFile;
