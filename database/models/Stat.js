import mongoose from "../connect";
import uniqueValidator from "mongoose-unique-validator";

let ObjectId = mongoose.Schema.ObjectId;

let stat = new mongoose.Schema(
  {
    userID: {
      type: ObjectId,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["DAILY_USAGE"],
    },
    sessionType: {
      type: String,
    },
    duation: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

stat.index({
  createdAt: "descending",
});

export default mongoose.models.Stat || mongoose.model("Stat", stat);
