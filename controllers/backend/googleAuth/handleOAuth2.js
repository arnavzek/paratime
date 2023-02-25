import fetch from "node-fetch";
import getUserInfo from "./getUserInfo";
let CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;
let GOOGLE_LOGIN_SECRET = process.env.GOOGLE_OAUTH_SECRET;

async function handleOAuth2(req) {
  let body = req.body;

  const tokenResponse = await fetch(
    `https://www.googleapis.com/oauth2/v4/token`,
    {
      method: "POST",
      body: JSON.stringify({
        code: body.code,
        client_id: CLIENT_ID,
        client_secret: GOOGLE_LOGIN_SECRET,
        redirect_uri: body.location,
        grant_type: "authorization_code",
      }),
    }
  );
  const tokenJson = await tokenResponse.json();
  const userInfo = await getUserInfo(tokenJson.access_token);

  if (tokenJson.error) {
    throw new Error(tokenJson.error);
  }

  if (userInfo.error) {
    throw new Error(userInfo.error);
  }

  return { accessToken: tokenJson.access_token, userInfo: userInfo };
}

export default handleOAuth2;
