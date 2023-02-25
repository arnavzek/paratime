import deleter from "./config/deleter";

import captureStorageUsage from "../captureStorageUsage";
import File from "../../../database/models/File";

export default async function deleteMultipleFiles(filesList) {
  let files = await File.find({ fileName: { $in: filesList } });

  let totalSize = 0;

  for (let item of files) {
    totalSize += item.size;
  }

  await captureStorageUsage(req, totalSize * -1);
  await File.deleteMany({ fileName: { $in: fileName } });

  for (let item of files) {
    await deleter(item.fileName);
  }

  return true;
}
