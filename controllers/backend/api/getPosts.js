import Notification from "../../../database/models/Notification";
import Post from "../../../database/models/Post";
import Profile from "../../../database/models/Profile";
import attachLikeData from "./attachLikeData";

export default async function getPosts(req) {
  let following = await Notification.find({
    senderUserID: req.user.id,
    type: "FOLLOW",
    status: true,
  });

  let followingList = [];

  following.map((item) => {
    followingList.push(item.receiverUserID);
  });

  let followingPosts = await Post.aggregate([
    { $match: { authorUserID: { $in: followingList } } },
    { $limit: 50 },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: "profiles",
        localField: "authorUserID",
        foreignField: "_id",
        as: "author",
      },
    },

    {
      $unwind: { path: "$author", preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        _id: 1,
        createdAt: 1,
        title: 1,
        images: 1,
        "author._id": 1,
        "author.username": 1,
        "author.image": 1,
        "author.name": 1,
      },
    },
  ]);

  var d = new Date();

  let queryDate = new Date(
    `${d.getMonth() + 1} / ${d.getDate()}/${d.getFullYear()}`
  );

  let query = { createdAt: { $gte: queryDate } };

  let worldWidePosts = await Post.aggregate([
    { $match: query },
    { $limit: 50 },
    { $sort: { likeCount: -1 } },
    {
      $lookup: {
        from: "profiles",
        localField: "authorUserID",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: { path: "$author", preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        _id: 1,
        createdAt: 1,
        title: 1,
        images: 1,
        "author._id": 1,
        "author.username": 1,
        "author.image": 1,
        "author.name": 1,
      },
    },
  ]);

  let posts = [...followingPosts, ...worldWidePosts];

  posts = await attachLikeData({ req, posts });
  return {
    posts: posts,
    followingUsers: following,
  };
}
