import Notification from "../../../database/models/Notification";

async function getFollowStatusList(IDs, userID) {
  let users = await Notification.find({
    receiverID: { $in: IDs },
    senderID: userID,
    status: "POSITIVE",
  }).select("receiverID");

  return users;
}

export default getFollowStatusList;
