import path from "path";
import generateRandomName from "./generateRandomName";

async function generateFileName(req) {
  let file = req.file;

  if (!path.extname(file.originalname))
    throw new Error("invalid file extension");

  return await getRandomName(file);
}

async function getRandomName(file) {
  let randomString = await generateRandomName();
  let newName = randomString + path.extname(file.originalname).toLowerCase();
  return newName;
}

export default generateFileName;
