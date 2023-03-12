import { useContext } from "react";
import Context from "../../../Context";
import compressAndUploadFile from "../compressAndUploadFile";
import requestProfileUpdate from "../editorPanel/requestProfileUpdate";
import selectFileAndCheck from "../selectFileAndCheck";

export default async function openProfileImageEditor({
  setForm,
  pageData,
  setPageData,
  popupAlert,
}) {
  let selectedFile;

  try {
    selectedFile = await selectFileAndCheck();
  } catch (e) {
    console.log(e);
    return;
  }

  let { profile } = pageData;

  setForm({ loading: true });
  try {
    let fileData = await compressAndUploadFile(
      getCurrentFileName(),
      selectedFile
    );
    await updateProfile(fileData);
    return fileData.fileName;
  } catch (e) {
    setForm();
    console.log(e);
    popupAlert(e.message);
  }

  function getCurrentFileName() {
    if (!pageData.profile.image) return null;
    if (pageData.profile.image.type !== "USER_UPLOAD") return null;
    return pageData.profile.image.data;
  }

  function updatePageData(fileName) {
    let newPageData = { ...pageData };
    newPageData.profile.image = { type: "USER_UPLOAD", data: fileName };
    setPageData(newPageData);
  }

  async function updateProfile({ fileName, colors }) {
    let newImageData = { type: "USER_UPLOAD", data: fileName, colors };
    let changes = { image: newImageData };
    let profileID = profile._id;
    requestProfileUpdate({ changes, profileID })
      .then(() => {
        setForm(false);
        updatePageData(fileName);
        popupAlert("Image Changed");
      })
      .catch(() => {
        throw Error(e.message);
      });
  }
}
