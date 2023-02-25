export default function sanitizeStr(str) {
  if (!str) return str;
  return str.toLowerCase().replace(/\s/gi, "").trim();
}
