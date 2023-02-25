import Profile from "../../../database/models/Profile";

export default async function updateStatus(req, res, next) {
  if (!req.user) return next("Please log in first");
  let theUser = await Profile.findOne({ _id: req.user.id });
  if (!req.body.sessionType) return next("Session type missing");
  if (!req.body.statusText) return next("Status text missing");

  let existingStatus = {};

  if (theUser.status) {
    existingStatus = JSON.parse(JSON.stringify(theUser.status));
  }

  existingStatus[req.body.sessionType] = req.body.statusText;

  let updatedProfile = await Profile.findOneAndUpdate(
    { _id: req.user.id },
    { status: existingStatus }
  );

  return res.json({ data: updatedProfile });
}
