import customConnect from "../../../controllers/backend/customConnect";
import getSearchRes from "../../../controllers/backend/api/getSearchRes";

export default customConnect().get(getSearchRes);
