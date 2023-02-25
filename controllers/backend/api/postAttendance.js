import Profile from "../../../database/models/Profile";

export default async function postSessionAttendance(req, res, next) {
  if (!req.user) return next("Please log in first");
  let theUser = await Profile.findOne({ _id: req.user.id });

  if (!theUser) return next("User not found");
  if (!req.body.newImage) return next("Image evidence missing");

  let lastSeenInSessionAt = new Date(theUser.lastSeenInSessionAt);

  let lastSeenInSessionAtInSec = lastSeenInSessionAt.getTime() / 1000;

  let now = new Date();
  let nowInSec = now.getTime() / 1000;
  let timeDiffBtwLastAttendanceAndNow = nowInSec - lastSeenInSessionAtInSec;

  if (timeDiffBtwLastAttendanceAndNow < 10) {
    return next("Attendance posted too sonn");
  }

  let newImageList = getNewImageList();

  let newDuration = theUser.todaysDuration ? theUser.todaysDuration : 0;
  let newMonthsDuration = theUser.monthsDuration ? theUser.monthsDuration : 0;
  //300s = 5 minutes
  if (lastSeenInSessionAt.getDate() == now.getDate()) {
    newDuration += 1;
  } else {
    newDuration = 0;
  }

  if (lastSeenInSessionAt.getMonth() == now.getMonth()) {
    newMonthsDuration += 1;
  } else {
    newMonthsDuration = 0;
  }

  let newStat = postStat();

  let updatedUser = await Profile.findOneAndUpdate(
    { _id: req.user.id },
    {
      lastSeenInSessionAt: new Date(),
      todaysDuration: newDuration,
      sessionImages: newImageList,
      monthsDuration: newMonthsDuration,
      dailyUsageStat: newStat,
    }
  );

  return res.json({ data: updatedUser });

  function getNewImageList() {
    let newImageList = [];

    if (theUser.sessionImages) {
      // if (theUser.sessionImages.length > 25) {
      newImageList = [...theUser.sessionImages];

      if (theUser.imageToRemove) {
        var theIndex = null;

        newImageList.map((item, index) => {
          if (item == theUser.imageToRemove) {
            theIndex = index;
          }
        });

        if (theIndex !== null) {
          newImageList.splice(theIndex, 1);
        }
      }
      // }
    }

    newImageList.push(req.body.newImage);

    return newImageList;
  }

  function postStat() {
    let newStat = {};

    if (theUser.dailyUsageStat) {
      newStat = theUser.dailyUsageStat;
    }

    let sessionTag = "WORK";

    let today = new Date();
    let dateString = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;

    if (!newStat[sessionTag]) {
      newStat[sessionTag] = { [dateString]: 1 };
    } else {
      if (newStat[sessionTag][dateString]) {
        newStat[sessionTag][dateString] += 1;
      }
    }

    return newStat;
  }
}
