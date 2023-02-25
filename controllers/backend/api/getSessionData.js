import Profile from "../../../database/models/Profile";

export default async function getSessionData(req, res, next) {
  let me = await Profile.findOne({ _id: req.user.id });
  if (!me) return next("User not found");
  let imageToRemove = getImageToRemove();

  var d = new Date();

  let queryDate = new Date(
    `${d.getMonth() + 1} / ${d.getDate()}/${d.getFullYear()}`
  );

  let query = { lastSeenInSessionAt: { $gte: queryDate } };

  if (req.query.showByCollege) {
    query.collegeID = me.collegeID;
  }

  let allOnlineUsers = await Profile.find(query).sort({ todaysDuration: -1 });

  return res.json({ data: { allOnlineUsers, me, imageToRemove } });

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
