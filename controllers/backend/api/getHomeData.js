import Profile from "../../../database/models/Profile";
import getPosts from "./getPosts";
import getUserRankings from "./getUserRankings";

export default async function getHomeData(req, res, next) {
  let me = await Profile.findOne({ _id: req.user.id });
  if (!me) return next("User not found");

  // var d = new Date();

  // let queryDate = new Date(`${d.getMonth() + 1}/1/${d.getFullYear()}`);

  // let query = { lastSeenInSessionAt: { $gte: queryDate } };

  let posts = await getPosts(req);

  return res.json({ data: { ...posts, me } });
}
