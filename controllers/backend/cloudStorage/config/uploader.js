import gc from "./config";
import mime from "mime-types";
import getBucketName from "../getBucketName";

function uploader(file, newFileName) {
  return new Promise((resolve, reject) => {
    let bucketName = getBucketName();
    const bucket = gc.bucket(bucketName);
    const { buffer } = file;

    if (!newFileName) return reject("name undefined");

    const blob = bucket.file("paratime-user-uploads/" + newFileName);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        setMetaData(blob, mime.lookup(file.originalname)).then(() => {
          resolve(true);
        });
      })
      .on("error", (data) => {
        reject(data.message);
      })
      .end(buffer);
  });
}

async function setMetaData(fileObject, contentType) {
  const data = await fileObject.setMetadata({
    metadata: {
      "Content-Type": contentType,
    },
  });

  return data;
}

export default uploader;
