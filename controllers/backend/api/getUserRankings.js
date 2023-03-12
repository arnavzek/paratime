import Notification from "../../../database/models/Notification";
import Profile from "../../../database/models/Profile";

export default async function getUserRankings(req) {
  var d = new Date();

  let queryDate = new Date(
    `${d.getMonth() + 1} / ${d.getDate()}/${d.getFullYear()}`
  );

  // let query = { lastSeenInSessionAt: { $gte: queryDate } };

  let following = await Notification.find({
    senderUserID: req.user.id,
    type: "FOLLOW",
    status: true,
  });

  let followingList = [];

  following.map((item) => {
    followingList.push(item.receiverUserID);
  });

  let followingUsers = await Profile.find({ _id: { $in: followingList } });

  return { followingUsers };
}
