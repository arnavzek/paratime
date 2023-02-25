const { destroyCookie } = require("nookies");

export default async function deleteCookie(req, res, next) {
  let options = {
    path: "/",
  };

  destroyCookie({ res }, process.env.NEXT_PUBLIC_USER_JWT_COOKIE_NAME, options);
  destroyCookie({ res }, process.env.NEXT_PUBLIC_LOCALSTORAGE_NAME, options);

  return res.status(200).json({ data: true });
}
