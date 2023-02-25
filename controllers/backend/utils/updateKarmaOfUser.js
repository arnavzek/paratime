import Profile from "../../../database/models/Profile";

export default async function updateKarmaOfUser({ userID, netLikeIncrement }) {
  await Profile.findOneAndUpdate(
    { _id: userID },
    {
      $inc: {
        "score.data": netLikeIncrement,
      },
    }
  );

  return true;
}
