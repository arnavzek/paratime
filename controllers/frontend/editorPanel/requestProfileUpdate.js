import capitalizeFirstLetter from "../capitalizeFirstLetter";
import getSelectedPage from "../getSelectedPage";
import { serverLine } from "../serverLine";

export default async function requestProfileUpdate({ changes, profileID }) {
  return serverLine.patch(`profile/`, {
    changes: changes,
    profileID: profileID,
  });
}
