import Profile from "../../../database/models/Profile";
import generateUsername from "../generateUsername";

async function createUser(data) {
  let payload = data.userInfo;
  let picture = payload.picture;
  let picObject = null;

  if (picture) {
    picObject = { data: picture, type: "URL" };
  }

  let user = await Profile.findOne({ email: payload.email });

  if (user) return user;

  let username = await generateUsername(payload.name);
  username = username.toLowerCase();

  var user_save = new Profile({
    name: payload.name,
    username: username,
    password: null,
    email: payload.email,
    image: picObject,
    googleId: payload.id,
    verified: true,
  });

  try {
    user = await user_save.save();
    return user;
  } catch (e) {
    console.log(e);
    if (e) throw new Error(e.message);
  }
}

export default createUser;
