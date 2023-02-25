import sanitizeStr from "./sanitizeStr";

export default function isHomePage({ pageType, profile, pageName }) {
  let homePageID = profile.config.homePageID;

  if (pageType == "postPage") return false;
  if (pageType == "home") return true;

  let currentPage = null;
  for (let page of profile.pages) {
    if (sanitizeStr(page.name) == sanitizeStr(pageName)) currentPage = page;
  }

  if (!currentPage) return false;
  return currentPage.id == homePageID;
}
