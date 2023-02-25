import Profile from "../../database/models/Profile";
import parseCookie from "./parseCookie";
import { parseCookies, destroyCookie } from "nookies";

async function getLoggedInUser(req, res) {
  let cookies = parseCookies({ req });
  let JwtCookieName = process.env.NEXT_PUBLIC_USER_JWT_COOKIE_NAME;
  let useridCookieName = process.env.NEXT_PUBLIC_USER_ID_COOKIE_NAME;
  let authToken = cookies[JwtCookieName];
  let userID = cookies[useridCookieName];
  let authorization = req.headers.authorization;

  if (authorization) authToken = authorization; // For apps
  if (!authorization)
    if ((userID && !authToken) || (!userID && authToken)) {
      deleteAllCookie();
      return false;
    }

  if (!authToken) return false;

  try {
    let parsedCookie = await parseCookie(authToken);
    let user = await Profile.findOne({ _id: parsedCookie.id });
    //.select(
    //   "interests interestsUpdatedAt _id name email image username storageUsage groupsServed notificationSeenAt"
    // );
    if (!user) {
      throw new Error("Invalid user");
    }
    return user;
  } catch ({ message }) {
    deleteAllCookie();
    throw new Error(message);
  }

  function deleteAllCookie() {
    let options = {
      path: "/",
    };
    destroyCookie({ res }, JwtCookieName, options);
    destroyCookie({ res }, useridCookieName, options);
  }
}

export default getLoggedInUser;
