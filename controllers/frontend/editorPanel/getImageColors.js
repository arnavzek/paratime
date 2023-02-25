import * as Vibrant from "node-vibrant";

export default function getImageColor({ url }) {
  return new Promise((resolve) => {
    Vibrant.from(url).getPalette((err, palette) => resolve(palette));
  });
}
