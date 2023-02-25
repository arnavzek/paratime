import gc from "./config";
import getBucketName from "../getBucketName";

async function deleter(fileName) {
  let bucketName = getBucketName();
  const bucket = gc.bucket(bucketName);
  try {
    await bucket.file("paratime-user-uploads/" + fileName).delete();
  } catch (e) {
    console.log(e);
  }

  return true;
}

module.exports = deleter;
