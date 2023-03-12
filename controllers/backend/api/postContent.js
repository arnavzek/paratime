import Post from "../../../database/models/Post";

export default async function postContent(req, res, next) {
  if (!req.user) return next("Please log in first");

  if (!req.body.duration) return next("duration missing");
  if (!req.body.images) return next("images missing");
  if (!req.body.title) return next("title missing");

  let post = new Post();
  post.durationInMins = req.body.durationInMins;
  post.images = req.body.images;
  post.title = req.body.title;
  let newPost = await post.save();

  return res.json({ data: { id: newPost._id } });
}
