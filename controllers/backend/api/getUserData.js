import Profile from "../../../database/models/Profile";

export default async function getUserData(req, res, next) {
  if (!req.user) return next("please log in");
  let me = await Profile.findOne({ _id: req.user.id });

  return res.json({ data: me });
}
