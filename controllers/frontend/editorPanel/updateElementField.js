import getSelectedPage from "../getSelectedPage";
import requestProfileUpdate from "./requestProfileUpdate";

export default function updateElementField({
  pageData,
  setPageData,
  selectedElement,
  type,
  newValue,
  field,
}) {
  let newPageData = { ...pageData };
  let selectedPage = getSelectedPage(newPageData);

  let toChange = null;

  if (selectedElement.id == "HEADER") {
    if (!newPageData.profile.config) {
      newPageData.profile.config = { header: { [field]: newValue } };
    } else {
      newPageData.profile.config.header[field] = newValue;
    }

    toChange = { config: newPageData.profile.config };
  } else {
    for (let element of selectedPage.elements) {
      if (element.id == selectedElement.id) {
        if (!element.data) element.data = {};
        if (type == "IMAGE") {
          element.data[field] = {
            type: "USER_UPLOAD",
            data: newValue,
          };
        } else {
          element.data[field] = newValue;
        }
      }
    }
    toChange = { pages: newPageData.profile.pages };
  }

  setPageData(newPageData);

  return requestProfileUpdate({
    changes: toChange,
    profileID: pageData.profile._id,
  });
}
