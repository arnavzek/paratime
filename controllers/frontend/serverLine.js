class ServerLine {
  get(route) {
    return executer(route);
  }

  post(route, body) {
    return executer(route, body, "POST");
  }

  delete(route) {
    return executer(route, null, "DELETE");
  }

  patch(route, body) {
    return executer(route, body, "PATCH");
  }
}

async function executer(route, body, method) {
  let requestType = "GET";
  if (body) requestType = "POST";
  if (method) requestType = method;

  let headerParam = {
    withCredentials: true,
    "Content-type": "application/json",
  };

  let requestObject = {
    method: requestType,
    headers: headerParam,
  };

  if (body) requestObject.body = JSON.stringify(body);

  route = "/api/v1/" + route;
  let res = await fetch(route, requestObject);

  let jsonData = await res.json();

  if (jsonData.error) throw Error(jsonData.error);
  return jsonData.data;
}

const serverLine = new ServerLine();

export { serverLine };
