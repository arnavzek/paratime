import Profile from "../../../database/models/Profile";
import checkUsernameAvailablity from "../checkUsernameAvailablity";

export default async function updateProfile(req, res, next) {
  if (!req.user) return next("Login in required");
  let profile = req.user;
  let changes = req.body.changes;

  let profileID = req.body.profileID;
  if (!profileID) profileID = req.user._id.toString();

  if (req.user.id !== profileID) {
    profile = await Profile.findOne({ _id: profileID });
    if (!profile) return next("Profile not found");
    return next("Access Denied");
  }

  for (let field in changes) {
    await updateUserObject(field, changes[field]);
  }

  async function updateUserObject(field, value) {
    if (!field) return next("field is required");

    let allowedFields = {
      name: "string",
      username: "string",
      tag: "string",
      bio: "string",
    };

    if (field == "username") {
      let newValue = value.toLowerCase().replace(/\s/gi, "").trim();
      if (!newValue) return next("invalid value");
      if (newValue.length < 3)
        return next("username should atleast be of length 3");
      await updateUsername(newValue);
    } else {
      if (!allowedFields[field]) return next("invalid field");
      if (allowedFields[field] !== typeof value)
        return next("invalid type of " + field);
      profile[field] = value;
    }
  }

  try {
    let newUser = await profile.save();
    return res.json({ data: newUser });
  } catch (e) {
    return next(e);
  }

  async function updateUsername(value) {
    let isAvialable = await checkUsernameAvailablity(value);
    if (!isAvialable) return next("Username is not available");
    profile.username = value;
  }
}
