import getLoggedInUser from "../getLoggedInUser";

async function attachUser(req, res, next) {
  try {
    let user = await getLoggedInUser(req, res);
    console.log(user, "Logged in user");
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
}

export default attachUser;
