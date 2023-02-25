export default function getUrlQuery() {
  let query = {};
  let queries = decodeURIComponent(window.location.search);
  if (!queries) return query;

  queries = queries.replace("?", "").split("&");
  queries.map((item) => {
    let split = item.split("=");
    query[split[0]] = split[1];
  });

  return query;
}
