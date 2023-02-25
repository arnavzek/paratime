function fileFilter(req, file, callback) {
  let { user } = req;

  let storageLimit = 500; //500 MB -> 1GB

  if (!user)
    return callback(new Error("You need to be logged in to upload files"));

  if (user.storageUsage)
    if (user.storageUsage > storageLimit)
      return callback(
        new Error(
          "Your have crossed your storage limit, please delete a few files "
        )
      );

  // if (file.mimetype == "image/svg+xml" && req.body.type == "operationalUpload")
  //   return failure("svg are insecure to upload");

  return callback(null, true);
}

export default fileFilter;
