import customConnect from "../../../controllers/backend/customConnect";
import getSessionData from "../../../controllers/backend/api/getSessionData";
import updateProfile from "../../../controllers/backend/api/updateProfile";

export default customConnect().patch(updateProfile);
