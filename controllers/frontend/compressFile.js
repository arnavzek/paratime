import imageCompression from "browser-image-compression";

async function compressFile(imageFile, options) {
  if (!options) options = { maxSizeMB: 0.5 };
  // if (!options) options = { maxSizeMB: 1, maxWidthOrHeight: 450 };
  // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  const settings = {
    maxSizeMB: options.maxSizeMB ? options.maxSizeMB : 0.5,
    // maxWidthOrHeight: options.maxWidthOrHeight ? options.maxWidthOrHeight : 450,
    useWebWorker: true,
  };

  /*
    Why maxsize as 450
    -> my screen size is 1000, image would only cover half of the screen at max
  */

  try {
    const compressedFile = await imageCompression(imageFile, settings);

    // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    return compressedFile; // write your own logic
  } catch (error) {
    console.log(error);
  }
}

export default compressFile;
