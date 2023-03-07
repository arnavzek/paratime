export default function initScreenshotCapture(success, error, onEnd) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const video = document.createElement("video");
  video.autoplay = true;
  // video.playsinline = true;
  // video.muted = true;

  let activated = false;

  async function initCanvas() {
    try {
      const options = { audio: true, video: { displaySurface: "monitor" } };
      const captureStream = await navigator.mediaDevices.getDisplayMedia(
        options
      );

      window.screenshareStream = captureStream;

      video.srcObject = captureStream;
      activated = true;

      canvas.width = screen.width;
      canvas.height = screen.height;

      // document.body.appendChild(video);
      // document.body.appendChild(canvas);

      captureStream.getVideoTracks()[0].addEventListener("ended", () => {
        onEnd();
      });

      success(true);
    } catch (err) {
      error(err);
    }
  }

  initCanvas();

  const doRecording = (callback) => {
    if (!activated) return callback(false);

    try {
      context.drawImage(video, 0, 0);
      const frame = canvas.toDataURL("image/png");
      console.log(frame);
      // callback(frame);
      canvas.toBlob((blob) => {
        callback(blob, frame);
      });
      // captureStream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      console.error("Error: " + err);
    }
  };

  function captureScreenshot() {
    return new Promise((resolve) => {
      doRecording(resolve);
    });
  }

  window.captureScreenshot = captureScreenshot;
}
