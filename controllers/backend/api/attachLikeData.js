import Notification from "../../../database/models/Notification";
import Post from "../../../database/models/Post";
import Profile from "../../../database/models/Profile";

export default async function attachLikeData({ req, posts }) {
  let postIDs = [];

  posts = JSON.parse(JSON.stringify(posts));

  for (let item of posts) {
    postIDs.push(item._id);
  }

  let likes = await Notification.find({
    senderUserID: req.user.id,
    subjectID: { $in: postIDs },
    type: "LIKE",
  });

  let likedPosts = [];

  for (let item of likes) {
    if (item.status == true) likedPosts.push(item.subjectID.toString());
  }

  for (let item of posts) {
    if (likedPosts.includes(item.subjectID.toString())) item.likeStatus = true;
  }

  return posts;
}
