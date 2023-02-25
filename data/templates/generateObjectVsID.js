import getRandomID from "./getRandomID";

function generateObjectVsID() {
  let folderVsID = {
    home: getRandomID(),
    soft: getRandomID(),
    // extra: getRandomID(),
  };

  let pageVsID = {
    home: getRandomID(),
    private: getRandomID(),
    other: getRandomID(),
  };

  let ObjectVsID = { folderVsID, pageVsID };
  return ObjectVsID;
}
export default generateObjectVsID;
