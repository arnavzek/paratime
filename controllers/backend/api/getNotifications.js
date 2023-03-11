import Notification from "../../../database/models/Notification";
import Profile from "../../../database/models/Profile";
import mongoose from "mongoose";

export default async function getNotifications(req, res, next) {
  if (!req.user) return next("User not found");

  let loggedInUser = await Profile.findOne({ _id: req.user.id });

  let limit = 50;

  let filter = {
    receiverUserID: mongoose.Types.ObjectId(req.user.id),
  };

  if (req.query.type == "count") {
    if (loggedInUser.notificationsSeenAt)
      filter.createdAt = {
        $gte: loggedInUser.notificationsSeenAt,
      };
    let data = await Notification.count({ ...filter });

    return res.json({
      data: data,
    });
  } else {
    let sortQuery = { createdAt: -1 };

    let notifs = await Notification.aggregate([
      { $match: filter },
      { $limit: limit },
      { $sort: sortQuery },
      {
        $lookup: {
          from: "profiles",
          localField: "senderUserID",
          foreignField: "_id",
          as: "sender",
        },
      },

      {
        $unwind: { path: "$sender", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 1,
          type: 1,
          createdAt: 1,
          postID: 1,
          "sender._id": 1,
          "sender.username": 1,
          "sender.image": 1,
          "sender.name": 1,
        },
      },
    ]);

    await Profile.findOneAndUpdate(
      { _id: req.user.id },
      { notificationsSeenAt: new Date() }
    );

    return res.json({
      data: {
        notifs,
        notificationsSeenAt: loggedInUser.notificationsSeenAt,
      },
    });
  }
}
