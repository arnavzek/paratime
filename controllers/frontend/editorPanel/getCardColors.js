export default function getCardColor({ cardData, colors }) {
  let worldColors = {
    prominantColor: "var(--prominantColor)",
    dominantColor: "var(--dominantColor)",
  };

  if (!colors)
    colors = {
      type: "CONTENT",
      data: {
        CONTENT: {},
        CUSTOM: {
          prominantColor: "#111",
          dominantColor: "#fff",
        },
      },
    };

  if (colors.type == "CONTENT") {
    let media = cardData.media;
    if (!media) return doSwitching(worldColors);
    let mediaType = media.type;
    let mediaColor = media.data[mediaType].colors;
    if (mediaColor) return doSwitching(mediaColor);
    return doSwitching(worldColors);
  } else if (colors.type == "WORLD") {
    return doSwitching(worldColors);
  }

  if (!colors.data[colors.type]) return doSwitching(worldColors);
  return colors.data[colors.type];
}

function doSwitching({ prominantColor, dominantColor }) {
  return { prominantColor: dominantColor, dominantColor: prominantColor };
}
