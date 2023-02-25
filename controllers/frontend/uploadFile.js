async function uploadFile(file, fileToUpdate) {
  if (!file.name) throw Error("File name is null");
  let form = new FormData();

  if (fileToUpdate) form.append("fileToUpdate", fileToUpdate); //for replacing
  form.append("file", file, file.name); //if it was appended before the other appends then req.body will not be processed instantly

  let endPoint = "/api/v1/upload";
  let response = await fetch(endPoint, {
    method: "POST",
    body: form,
  });

  let postData = await response.json();
  if (postData.error) throw Error(postData.error);
  return postData.data;
}

export default uploadFile;
