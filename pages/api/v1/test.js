import customConnect from "../../../controllers/backend/customConnect";

import postSessionAttendance from "../../../controllers/backend/api/postAttendance";
import Profile from "../../../database/models/Profile";

export default customConnect().get(test);

async function test(req, res, next) {
  let users = await Profile.find();
  return res.json({ data: users });
}
