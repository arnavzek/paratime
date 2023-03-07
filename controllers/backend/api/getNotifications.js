import Notification from "../../../database/models/Notification";

export default async function getNotifications(req, res, next) {
  if (!req.user) return next("User not found");

  let notifs = await Notification.find({ receiverID: req.user.id });

  return res.json({ data: notifs });
}
