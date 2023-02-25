import gc from "./config";
import getBucketName from "../getBucketName";

function reader(fileName, res) {
  let bucketName = getBucketName();
  const bucket = gc.bucket(bucketName);
  let remoteFile = bucket.file(fileName);

  remoteFile
    .createReadStream()
    .on("error", function (err) {
      throw error;
    })
    .on("response", function (response) {
      // Server connected and responded with the specified status and headers.
    })
    .on("end", function () {
      // The file is fully downloaded.
    })
    .pipe(res);
}

module.exports = reader;
