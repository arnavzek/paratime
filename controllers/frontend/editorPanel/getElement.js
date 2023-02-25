import getSelectedPage from "../getSelectedPage";

export default function getElement(elementID, pageData) {
  let selectedPage = getSelectedPage(pageData);
  if (elementID == "HEADER") {
    let header = pageData.profile?.config?.header;
    return {
      id: "HEADER",
      componentID: 0,
      data: header
        ? header
        : { desktopDesign: "desktop0", mobileDesign: "mobile0" },
    };
  }

  if (!elementID) return null;

  if (!selectedPage.elements) return null;

  for (let element of selectedPage.elements) {
    if (element.id == elementID) return element;
  }
}
