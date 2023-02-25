import compressFile from "./compressFile";
import selectFile from "./selectFile";
import uploadFile from "./uploadFile";

export default async function compressAndUploadFile(
  fileToUpdate,
  selectedFile
) {
  if (!selectedFile) {
    let files = await selectFile();
    // console.log("event---", files);
    if (!files) throw Error("File not selected");
    if (!files.length) throw Error("File not selected");
    selectedFile = files[0];
  }

  let compressedFile = await compressFile(selectedFile);
  let fileData = await uploadFile(compressedFile, fileToUpdate);
  return fileData;
}
