import customConnect from "../../../controllers/backend/customConnect";
import postFollow from "../../../controllers/backend/api/postFollow";

export default customConnect().post(postFollow);
