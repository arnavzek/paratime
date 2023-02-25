import getCookie from "./getCookie";

export default function getUserID() {
  if (typeof window == "undefined") return false;

  return getCookie(process.env.NEXT_PUBLIC_USER_ID_COOKIE_NAME);
}
