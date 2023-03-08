import mongoose from "../connect";

let ObjectId = mongoose.Schema.ObjectId;

let notification = new mongoose.Schema(
  {
    senderUserID: { type: ObjectId },
    receiverUserID: { type: ObjectId },
    type: { type: String, enum: ["FOLLOW"] },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

notification.index({ receiverUserID: 1, createdAt: 1 });
notification.index({ senderUserID: 1, receiverUserID: 1, type: 1 });

export default mongoose.models.Notification ||
  mongoose.model("Notification", notification);
