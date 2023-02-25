function selectFile(options) {
  return new Promise((resolve) => {
    let fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.addEventListener("change", (e) => {
      resolve(e.target.files);
    });
    if (options)
      if (options.allowMultipleFiles) fileInput.setAttribute("multiple", true);
    if (options)
      if (options.allowFolders) fileInput.setAttribute("webkitdirectory", true);
    fileInput.click();
  });
}

export default selectFile;
