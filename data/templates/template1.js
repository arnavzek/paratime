import getDefaultColors from "../../controllers/frontend/getDefaultColors";
import generateObjectVsID from "./generateObjectVsID";
import getDefaultFeeds from "./getDefaultFeeds";
import getDefaultFolders from "./getDefaultFolders";
import getDefaultPages from "./getDefaultPages";
import getRandomID from "./getRandomID";
let { pageVsID, folderVsID } = generateObjectVsID();

let headerConfig1 = { design: 0 };

let template1 = {
  config: {
    homePageID: pageVsID.home,
    templateID: 1,
    version: 1,
    colors: getDefaultColors(true),
    header: headerConfig1,
  },
  followingCategorized: getDefaultFeeds(),
  name: "Simple",
  description: "less is more",
  folders: getDefaultFolders(folderVsID),
  navigation: null,
  pages: getDefaultPages({ pageVsID, folderVsID }),
};

export default template1;
