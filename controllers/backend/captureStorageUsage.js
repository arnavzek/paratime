import Profile from "../../database/models/Profile";

function bytesToMegaBytes(bytes) {
  //1KB = 1024Bytes
  //1MB = 1024KiloBites
  //1GB = 1024Mega Bytes
  let bytesInOneMB = 1024 ** 2;
  let mbValue = bytes / bytesInOneMB;
  return round(mbValue);
}

function round(num) {
  return Math.round(num * 100) / 100; //to 2 decimal places
}

async function captureStorageUsage(req, usage) {
  usage = bytesToMegaBytes(usage);
  let doc = await Profile.findOneAndUpdate(
    { _id: req.user._id },
    { $inc: { storageUsage: usage } }
  );

  if (doc) return true;
  return false;
}
export default captureStorageUsage;
