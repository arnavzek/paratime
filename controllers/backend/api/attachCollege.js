import Profile from "../../../database/models/Profile";

export default async function attachCollege(req, res, next) {
  if (!req.body.collegeID) return next("collegeID missing");
  let me = await Profile.findOneAndUpdate(
    { _id: req.user.id },
    { collegeID: req.body.collegeID }
  );

  return res.json({ data: me });
}
