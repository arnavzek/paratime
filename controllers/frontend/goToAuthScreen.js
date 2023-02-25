export default function goToAuthScreen() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;
  const redirectUri = `${window.location.origin}/auth-redirect`;
  const responseType = "code";
  const scope = "profile email openid";

  let theLink = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&access_type=offline&include_granted_scopes=true`;

  // console.log(theLink);
  window.location = theLink;
}
