import File from "../../database/models/File";

async function isFileAuthor(fileName, req) {
  let fileData = await File.findOne({ fileName: fileName });

  if (!fileData) throw new Error("File not found");

  if (req.user._id.equals(fileData.authorID)) return true;
  return false;
}

export default isFileAuthor;
