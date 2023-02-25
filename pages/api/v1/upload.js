import multer from "multer";
import cloudStorageUpload from "../../../controllers/backend/cloudStorage/cloudStorageUpload";
import deleteFile from "../../../controllers/backend/cloudStorage/deleteFile";
import fileFilter from "../../../controllers/backend/cloudStorage/fileFilter";
import customConnect from "../../../controllers/backend/customConnect";

const multerMid = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, //5 MB
});

export default customConnect()
  .use(multerMid.single("file"))
  .post(cloudStorageUpload)
  .delete(deleteFile);

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
