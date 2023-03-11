import Base from "../../components/Base";
import UserPage from "../../components/UserPage";
import WithHeader from "../../components/WithHeader";
import attachUser from "../../controllers/backend/middlewares/attachUser";
import Notification from "../../database/models/Notification";
import Post from "../../database/models/Post";
import Profile from "../../database/models/Profile";

export default function handle({ followStatus, user, posts }) {
  return (
    <Base>
      <WithHeader>
        <UserPage user={user} followStatus={followStatus} posts={posts} />
      </WithHeader>
    </Base>
  );
}

export async function getServerSideProps(ctx) {
  let { req, res, params } = ctx;

  await attachUser(req, res, () => {});

  let id = params.id;

  let user = await Profile.findOne({ username: id });

  let followStatus = await Notification.findOne({
    senderUserID: req.user.id,
    receiverUserID: user._id,
    type: "FOLLOW",
    status: true,
  });

  user = JSON.parse(JSON.stringify(user));
  followStatus = JSON.parse(JSON.stringify(followStatus));
  // let user =

  let posts = await Post.find({ authorUserID: req.user.id });

  return {
    props: { user, followStatus, posts }, // will be passed to the page component as props
  };
}
