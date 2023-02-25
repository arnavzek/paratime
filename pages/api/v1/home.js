import customConnect from "../../../controllers/backend/customConnect";
import getHomeData from "../../../controllers/backend/api/getHomeData";

export default customConnect().get(getHomeData);
