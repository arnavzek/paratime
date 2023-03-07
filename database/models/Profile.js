import jwt from "jsonwebtoken";
import mongoose from "../connect";
import uniqueValidator from "mongoose-unique-validator";

const secret = process.env.JWT_SECRET;
let ObjectId = mongoose.Schema.ObjectId;

let profile = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    collegeID: { type: Number, default: 0 },
    googleID: { type: String },
    profileImage: { type: Object },
    sessionImages: [{ type: String }],
    status: { type: Object },
    dailyUsageStat: { type: Object },
    todaysDuration: { type: Number },
    monthsDuration: { type: Number },
    bio: { type: String },
    tags: [{ type: String }],
    storageUsage: { type: Number },
    name: { type: String },
    email: { type: String },
    lastSeenInSessionAt: { type: Date },
  },
  { timestamps: true }
);

profile.index({ email: 1 });
profile.index({ todaysDuration: 1 });
profile.index({ monthsDuration: 1 });

profile.methods.generateToken = function (aliasID) {
  let JWT_payload = {
    id: aliasID ? aliasID : this.id,
  };

  return jwt.sign(JWT_payload, secret, {
    expiresIn: "360 days",
  });
};

profile.plugin(uniqueValidator);

export default mongoose.models.Profile || mongoose.model("Profile", profile);
