import mongoose from "../connect";
import uniqueValidator from "mongoose-unique-validator";

let ObjectId = mongoose.Schema.ObjectId;

let file = new mongoose.Schema(
  {
    authorID: {
      type: ObjectId,
      required: true,
    },
    fileName: {
      type: String,
      unique: true,
      required: true,
    },
    actualExtension: {
      type: String,
      required: true,
    },
    size: {
      type: Number, //bytes
    },
  },
  { timestamps: true }
);

file.plugin(uniqueValidator);

file.index({
  fileName: "descending",
});

export default mongoose.models.File || mongoose.model("File", file);
