import customConnect from "../../../controllers/backend/customConnect";
import attachCollege from "../../../controllers/backend/api/attachCollege";

export default customConnect().get(attachCollege);
