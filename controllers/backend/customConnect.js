import nc from "next-connect";
import attachUser from "./middlewares/attachUser";
import onError from "./onError";

function customConnect() {
  return nc({ onError }).use(attachUser);
}

export default customConnect;
