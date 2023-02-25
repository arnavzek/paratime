import customConnect from "../../../controllers/backend/customConnect";
function loggedInUser(req, res) {
  res.json({ data: req.user });
}
export default customConnect().get(loggedInUser);
