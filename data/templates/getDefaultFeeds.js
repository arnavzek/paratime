import getRandomID from "./getRandomID";

export default function getDefaultFeeds() {
  let rank = [];

  for (let i = 0; i <= 6; i++) {
    rank.push(getRandomID());
  }

  rank.push("topicsYouFollow");
  rank.push("recommended");

  return {
    data: {
      [rank[0]]: getFeedObject("Favorites"),
      [rank[1]]: getFeedObject("Work"),
      [rank[2]]: getFeedObject("Friends"),
      [rank[3]]: getFeedObject("Relatives"),
      [rank[4]]: getFeedObject("Fun"),
      [rank[5]]: getFeedObject("Hobby"),
      [rank[6]]: getFeedObject("General"),
    },
    rank: rank,
  };

  function getFeedObject(name, isPrivate) {
    return {
      name,
      type: "USERS",
      users: [],
      isPrivate: isPrivate ? true : false,
    };
  }
}
