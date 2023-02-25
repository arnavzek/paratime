export default function getUserPreferences() {
  let defaultState = { template: "light" };
  if (typeof window == "undefined") return defaultState;

  let userPreference = localStorage.getItem(
    process.env.NEXT_PUBLIC_LOCALSTORAGE_NAME
  );

  if (!userPreference) return defaultState;
  return JSON.parse(userPreference);
}
