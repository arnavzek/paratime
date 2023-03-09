import Notification from "../../../database/models/Notification";

export default async function postFollow(req, res, next) {
  if (!req.user) return next("User not found");

  if (!req.body.receiverUserID) return next("receiverUserID not found");

  let receiverUserID = req.body.receiverUserID;
  let senderUserID = req.user.id;

  let finalStatus = true;

  let existingNotif = await Notification.findOne({
    senderUserID,
    receiverUserID,
    type,
  });

  if (existingNotif) {
    if (existingNotif.status == true) {
      finalStatus = true;
      Notification.findOneAndUpdate(
        { _id: existingNotif.id },
        { status: false }
      );
    } else {
      finalStatus = false;
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
    newNotif.status = true;
    await newNotif.save();
  }

  return res.json({ data: finalStatus });
}
