import getDefaultColors from "../../controllers/frontend/getDefaultColors";
import generateObjectVsID from "./generateObjectVsID";
import getDefaultFeeds from "./getDefaultFeeds";
import getDefaultFolders from "./getDefaultFolders";
import getDefaultPages from "./getDefaultPages";
import getRandomID from "./getRandomID";
let { pageVsID, folderVsID } = generateObjectVsID();

let headerConfig2 = {
  design: 1,
  media: {
    type: "IMAGE",
    data: {
      IMAGE: {
        type: "LOCAL",
        data: "/templates/2/headerMedia.jpg",
        colors: {
          prominantColor: "#111",
          dominantColor: "#fff",
        },
      },
      VIDEO: {
        type: "EMBED",
        data: null,
      },
    },
  },
};

let template2 = {
  config: {
    homePageID: pageVsID.home,
    templateID: 2,
    version: 1,
    colors: getDefaultColors(true),
    header: headerConfig2,
  },
  followingCategorized: getDefaultFeeds(),
  name: "Creative Vibes",
  description: "Cretive vibes",
  folders: getDefaultFolders(folderVsID),
  navigation: null,
  pages: getDefaultPages({ pageVsID, folderVsID }),
};

export default template2;
