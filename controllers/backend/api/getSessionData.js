import Notification from "../../../database/models/Notification";
import Profile from "../../../database/models/Profile";
import getFollowingUsers from "./getFollowingUsers";

export default async function getSessionData(req, res, next) {
  let me = await Profile.findOne({ _id: req.user.id });
  if (!me) return next("User not found");

  let followingUsers = await getFollowingUsers(req);

  return res.json({
    data: { me, followingUsers },
  });
}
