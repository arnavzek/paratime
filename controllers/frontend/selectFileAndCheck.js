import compressFile from "./compressFile";
import selectFile from "./selectFile";
import uploadFile from "./uploadFile";

export default async function selectFileAndCheck() {
  let files = await selectFile();
  console.log("event---", files);
  if (!files) throw Error("File not selected");
  if (!files.length) throw Error("File not selected");
  return files[0];
}
