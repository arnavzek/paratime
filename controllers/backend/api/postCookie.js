import createUser from "../googleAuth/createUser";
import handleOAuth2 from "../googleAuth/handleOAuth2";

const { parseCookies, setCookie, destroyCookie } = require("nookies");

export default async function postCookie(req, res, next) {
  try {
    let data = await handleOAuth2(req);
    let user = await createUser(data);
    return sendResponse(user);
  } catch (e) {
    console.warn(e);
    next(e);
  }

  function sendResponse(user) {
    let jwtCookie = user.generateToken();

    let days = parseInt(process.env.NEXT_PUBLIC_COOKIE_EXPIRY_IN_DAYS);

    let maxAge = days * 24 * 60 * 60 * 1000;

    setCookie(
      { res },
      process.env.NEXT_PUBLIC_USER_JWT_COOKIE_NAME,
      jwtCookie,
      {
        maxAge,
        httpOnly: true,
        path: "/",
      }
    );

    setCookie(
      { res },
      process.env.NEXT_PUBLIC_USER_ID_COOKIE_NAME,
      user._id.toString(),
      {
        maxAge,
        path: "/",
      }
    );

    res.status(200).json({ data: { token: jwtCookie } });
  }
}
