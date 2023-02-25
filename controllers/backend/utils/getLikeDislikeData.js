import Notification from "../../../database/models/Notification";

export default async function getLikeDislikeData(loggedInUser, documents) {
  let articleIDs = [];

  if (!documents.length) return { likeData: [], dislikeData: [] };

  for (let article of documents) {
    articleIDs.push(article._id.toString());
  }

  let likeData = await Notification.find({
    type: "like",
    subjectID: { $in: articleIDs },
    senderID: loggedInUser._id.toString(),
    status: "POSITIVE",
  });

  let dislikeData = await Notification.find({
    type: "like",
    subjectID: { $in: articleIDs },
    senderID: loggedInUser._id.toString(),
    status: "NEGATIVE",
  });

  likeData = likeData.map((item) => {
    return item.subjectID;
  });

  likeData = dislikeData.map((item) => {
    return item.subjectID;
  });

  return { likeData, dislikeData };
}
