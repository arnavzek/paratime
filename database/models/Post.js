import mongoose from "../connect";

let ObjectId = mongoose.Schema.ObjectId;

let post = new mongoose.Schema(
  {
    authorUserID: { type: ObjectId },
    likeCount: { type: Number },
    title: { type: String },
    images: [{ type: String }],
    durationInMins: { type: Number },
  },
  { timestamps: true }
);

post.index({ authorUserID: 1, createdAt: 1 });
post.index({ createdAt: 1, likeCount: 1 });

export default mongoose.models.Post || mongoose.model("Post", post);
