import Base from "../../components/Base";
import PostPage from "../../components/PostPage";
import UserPage from "../../components/PostPage";
import WithHeader from "../../components/WithHeader";
import attachUser from "../../controllers/backend/middlewares/attachUser";
import Notification from "../../database/models/Notification";
import Post from "../../database/models/Post";
import Profile from "../../database/models/Profile";

export default function handle({ postData, user, posts }) {
  return (
    <Base>
      <WithHeader>
        <PostPage postData={postData} />
      </WithHeader>
    </Base>
  );
}

export async function getServerSideProps(ctx) {
  let { req, res, params } = ctx;

  await attachUser(req, res, () => {});

  let id = params.id;

  let post = await Post.findOne({ username: id });
  let author = await Profile.findOne({ _id: post.authorUserID });
  let likeData = await Notification.findOne({
    senderUserID: req.user.id,
    subjectID: id,
    type: "LIKE",
  });

  post = JSON.parse(JSON.stringify(post));

  if (likeData.status == true) {
    post.likeStatus = true;
  } else {
    post.likeStatus = false;
  }

  post.author = author;

  return {
    props: { postData: post }, // will be passed to the page component as props
  };
}
