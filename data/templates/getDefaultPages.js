import getDefaultColors from "../../controllers/frontend/getDefaultColors";
import generateObjectVsID from "./generateObjectVsID";
import getDefaultFeeds from "./getDefaultFeeds";

import getRandomID from "./getRandomID";

export default function getDefaultPages({ folderVsID, pageVsID }) {
  let pages = [
    {
      pinned: true,
      id: pageVsID.home,
      name: "Home",
      elements: [
        {
          id: getRandomID(),
          componentID: 1,
          data: { folderID: folderVsID.home },
        },
      ],
    },
    {
      pinned: true,
      id: getRandomID(),
      name: "Extra",
      elements: [
        {
          id: getRandomID(),
          componentID: 1,
          data: { folderID: folderVsID.soft },
        },
      ],
    },
  ];

  return pages;
}
