import Notification from "../../../database/models/Notification";
import Profile from "../../../database/models/Profile";
import getUserRankings from "./getUserRankings";

export default async function getSessionData(req, res, next) {
  let me = await Profile.findOne({ _id: req.user.id });
  if (!me) return next("User not found");
  let imageToRemove = getImageToRemove();

  let rankingData = await getUserRankings(req);

  return res.json({
    data: { ...rankingData, me, imageToRemove },
  });

  function getImageToRemove() {
    let img = null;

    if (me.sessionImages) {
      if (me.sessionImages.length > 50) {
        img = me.sessionImages[0];
      }
    }

    return img;
  }
}
