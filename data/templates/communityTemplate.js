import getDefaultColors from "../../controllers/frontend/getDefaultColors";
import generateObjectVsID from "./generateObjectVsID";
import getDefaultFeeds from "./getDefaultFeeds";
import getDefaultFolders from "./getDefaultFolders";
import getRandomID from "./getRandomID";
let { pageVsID, folderVsID } = generateObjectVsID();

let headerConfig1 = { design: 0 };

let communityTemplate = {
  config: {
    homePageID: pageVsID.home,
    templateID: 0,
    version: 1,
    colors: getDefaultColors(true),
    header: headerConfig1,
  },
  followingCategorized: getDefaultFeeds(),
  name: "Simple",
  description: "less is more",
  folders: getDefaultFolders(folderVsID),
  navigation: null,
  pages: [
    {
      pinned: true,
      id: pageVsID.home,
      name: "Home",
      elements: [
        {
          id: getRandomID(),
          componentID: 1,
          data: { name: "Posts", folderID: null },
        },
      ],
    },
  ],
};

export default communityTemplate;
