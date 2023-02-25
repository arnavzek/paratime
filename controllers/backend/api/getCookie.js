const { parseCookies } = require("nookies");

export default async function getCookie(req, res, next) {
  let cookies = parseCookies({ req });
  return res.status(200).json({ data: { cookies } });
}
