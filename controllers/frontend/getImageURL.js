import getLinkToGCP from "./getLinkToGCP";

export default function getImageURL(imageObject, isProfile) {
  if (typeof imageObject == "string")
    imageObject = { data: imageObject, type: "USER_UPLOAD" };

  if (!imageObject) return getDefaultImage();

  if (imageObject.type == "URL") {
    if (imageObject.data) return imageObject.data;
  } else if (imageObject.type == "USER_UPLOAD") {
    if (imageObject.data) return getLinkToGCP(imageObject.data);
  } else if (imageObject.type == "LINK_PREVIEW") {
    if (imageObject.data) return getLinkToGCP(imageObject.data, "link-preview");
  } else if (imageObject.type == "LOCAL") {
    if (imageObject.data) return imageObject.data;
  } else if (imageObject.type == "UNSPLASH") {
    if (imageObject.data) return imageObject.data;
  } else {
    getDefaultImage();
  }

  function getDefaultImage() {
    if (isProfile) {
      return `/defaultProfile.png`;
    } else {
      return `/defaultImage.png`;
    }
  }
}
