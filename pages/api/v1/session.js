import customConnect from "../../../controllers/backend/customConnect";
import getSessionData from "../../../controllers/backend/api/getSessionData";

export default customConnect().get(getSessionData);
