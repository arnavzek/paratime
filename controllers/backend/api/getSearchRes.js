import Profile from "../../../database/models/Profile";

export default async function getSearchRes(req, res, next) {
  if (!req.user) return next("User not found");

  let notifs = [];

  if (req.query.query) {
    notifs = await Profile.find({ $text: { $search: req.query.query } }).limit(
      20
    );
  } else if (req.query.tag) {
    notifs = await Profile.find({ tags: req.query.tag });
  } else {
    return next("Invalid search");
  }

  return res.json({ data: notifs });
}
