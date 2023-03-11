import Notification from "../../../database/models/Notification";
import Profile from "../../../database/models/Profile";

export default async function getFollowingUsers(req) {
  let following = await Notification.find({
    senderUserID: req.user.id,
    type: "FOLLOW",
    status: true,
  });

  let followingList = [];

  following.map((item) => {
    followingList.push(item.receiverUserID);
  });

  let followingUsers = await Profile.find({
    _id: { $in: [followingList, req.user.id] },
  }).sort({ monthsDuration: -1 });

  return followingUsers;
}
