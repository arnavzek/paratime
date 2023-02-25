import customConnect from "../../../controllers/backend/customConnect";

import postSessionAttendance from "../../../controllers/backend/api/postAttendance";

export default customConnect().post(postSessionAttendance);
