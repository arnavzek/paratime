import Profile from "../../database/models/Profile";

export default async function checkUsernameAvailablity(username) {
  let profile = await Profile.findOne({ username });
  if (profile) return false;
  return true;
}
