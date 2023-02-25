import { serverLine } from "./serverLine";

function logout() {
  localStorage.removeItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_NAME);
  serverLine.delete("cookie").then(() => {
    window.location = window.location.origin;
  });
}

export default logout;
