import getBucketName from "../backend/cloudStorage/getBucketName";

export default function getLinkToGCP(filename, folder) {
  if (!folder) folder = "paratime-user-uploads";
  return `https://storage.googleapis.com/${getBucketName()}/${folder}/${filename}`;
}
