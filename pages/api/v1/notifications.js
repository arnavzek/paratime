import customConnect from "../../../controllers/backend/customConnect";
import getNotifications from "../../../controllers/backend/api/getNotifications";

export default customConnect().get(getNotifications);
