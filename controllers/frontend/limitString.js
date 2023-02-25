export function limitString(str, maxLength) {
  if (!str) return str;
  if (!maxLength) return str;
  if (str.length <= maxLength) return str;

  return str.slice(0, maxLength) + "...";
}
