export default function getDefaultFolders(folderVsID) {
  //folders will be same for all templates
  return {
    [folderVsID.home]: { name: "Home", users: [], privacy: "PUBLIC" },
    [folderVsID.soft]: { name: "Extra", users: [], privacy: "PUBLIC" },
    // [folderVsID.private]: { name: "Private", users: [], privacy: "PRIVATE" },
    // [folderVsID.extra]: { name: "Extra", users: [], privacy: "PUBLIC" },
  };
}
