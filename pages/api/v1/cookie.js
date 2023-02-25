import postCookie from "../../../controllers/backend/api/postCookie";
import getCookie from "../../../controllers/backend/api/getCookie";
import deleteCookie from "../../../controllers/backend/api/deleteCookie";
import customConnect from "../../../controllers/backend/customConnect";

export default customConnect()
  .post(postCookie)
  .get(getCookie)
  .delete(deleteCookie);
