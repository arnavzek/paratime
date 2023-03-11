import Notification from "../../../database/models/Notification";
import Post from "../../../database/models/Post";

export default async function postLike(req, res, next) {
  if (!req.user) return next("User not found");

  if (!req.body.postID) return next("postID not found");
  let postID = req.body.postID;
  let receiver = await Post.findOne({ _id: postID });

  if (!receiver) return next("receiver not found");

  let receiverUserID = receiver._id;
  let senderUserID = req.user.id;

  let finalStatus = true;
  let type = "LIKE";
  let existingNotif = await Notification.findOne({
    senderUserID,
    subjectID: postID,
    type,
  });

  if (existingNotif) {
    if (existingNotif.status == true) {
      finalStatus = false;
      Notification.findOneAndUpdate(
        { _id: existingNotif.id },
        { status: false }
      );
    } else {
      finalStatus = true;
      Notification.findOneAndUpdate(
        { _id: existingNotif.id },
        { status: true }
      );
    }
  } else {
    finalStatus = true;

    let newNotif = new Notification();
    newNotif.senderUserID = senderUserID;
    newNotif.receiverUserID = receiverUserID;
    newNotif.postID = postID;
    newNotif.subjectID = postID;
    newNotif.type = "FOLLOW";
    newNotif.status = true;
    await newNotif.save();
  }

  if (finalStatus) {
    await Post.findOneAndUpdate({ _id: postID }, { $inc: { likeCount: 1 } });
  } else {
    await Post.findOneAndUpdate({ _id: postID }, { $inc: { likeCount: -1 } });
  }

  return res.json({ data: finalStatus });
}
