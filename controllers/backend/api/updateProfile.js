import Profile from "../../../database/models/Profile";
import checkUsernameAvailablity from "../checkUsernameAvailablity";
import isAdminOrModerator from "../isAdminOrModerator";
import checkPremiumUsernameAccess from "../utils/checkPremiumUsernameAccess";
import categoryData from "../../../data/categoryData";

export default async function updateProfile(req, res, next) {
  if (!req.user) return next("Login in required");
  let profile = req.user;
  let changes = req.body.changes;

  let profileID = req.body.profileID;
  if (!profileID) profileID = req.user._id.toString();

  if (req.user._id.toString() !== profileID) {
    profile = await Profile.findOne({ _id: profileID });
    if (!profile) return next("Profile not found");
    let hasAuthority = isAdminOrModerator(req.user._id, profile);
    if (!hasAuthority) return next("Access Denied");
  }

  for (let field in changes) {
    await updateUserObject(field, changes[field]);
  }

  async function updateUserObject(field, value) {
    if (!field) return next("field is required");

    let allowedFields = {
      name: "string",
      username: "string",
      phoneNumber: "string",
      country: "string",
      tagline: "string",
      bio: "string",
      image: "object",
      pages: "object",
      config: "object",
      socialLinks: "object",
    };

    if (field == "followingTopics") {
      if (value && Array.isArray(value)) {
        let topics = [];
        for (let item of value) {
          if (categoryData[item]) topics.push(item);
        }
        profile.followingTopics = topics;
      }
    } else if (field == "onboarding") {
      if (!profile.onboarding) profile.onboarding = { [value]: true };
      profile.onboarding = { ...profile.onboarding, [value]: true };
    } else if (field == "username") {
      let newValue = value.toLowerCase().replace(/\s/gi, "").trim();
      if (!newValue) return next("invalid value");
      if (newValue.length < 4)
        return next("username should atleast be of length 4");
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
    let hasPremiumUsername = checkPremiumUsernameAccess(profile);
    if (!hasPremiumUsername) {
      let check = lastFourLettersAreDigits(value);
      if (!check)
        return next(
          "Please buy premium username to get access to millions of clean professional usernames otherwise suffix your username with 4 digits. This is to ensure premium usernames are not hoarded"
        );

      let usernameWithoutSuffix = value.substring(0, value.length - 4);
      if (!usernameWithoutSuffix) return next("username can't be empty");
    }

    let isAvialable = await checkUsernameAvailablity(value);
    if (!isAvialable) return next("Username is not available");
    profile.username = value;
  }
}

function lastFourLettersAreDigits(str) {
  let data = str.substring(str.length - 4, str.length);
  let data2 = parseInt(data);
  if (isNaN(data2)) return false;
  if (typeof data2 == "number") return true;
}
