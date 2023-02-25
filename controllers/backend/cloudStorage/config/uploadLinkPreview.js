import gc from "./config";
import mime from "mime-types";
import getBucketName from "../getBucketName";
import * as request from "request";
import path from "path";
import generateRandomName from "../generateRandomName";

async function genRandomFileName(url) {
  let randomString = await generateRandomName();
  let newName = randomString + path.extname(url).toLowerCase();
  return newName;
}

function uploadLinkPreview(url) {
  return new Promise((resolve, reject) => {
    genRandomFileName(url).then((newFileName) => {
      let req = request(url);
      req.pause();
      req.on("response", (res) => {
        if (res.statusCode !== 200) {
          reject(new Error("unable to download file from url"));
        }

        let bucketName = getBucketName();
        const bucket = gc.bucket(bucketName);

        const blob = bucket.file("link-preview/" + newFileName);
        const writeStream = blob.createWriteStream({
          resumable: false,
        });
        req
          .pipe(writeStream)
          .on("finish", () => {
            setMetaData(blob, "image/jpeg").then(() => {
              resolve(newFileName);
            });
          })
          .on("error", (err) => {
            writeStream.end();
            console.error(err);
            reject(data.message);
          });
        req.resume();
      });
    });
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

export default uploadLinkPreview;
