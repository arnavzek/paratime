export default function fetchGoogleFont(fontList) {
  if (typeof window == "undefined") return;
  if (!window.loadedFont) window.loadedFont = [];

  let fontsToLoad = [];

  for (let font of fontList) {
    if (!window.loadedFont.includes(font)) fontsToLoad.push(font);
  }

  console.log(fontsToLoad, fontList);

  if (!fontsToLoad.length) return;
  window.WebFont.load({
    google: {
      families: fontsToLoad,
    },
  });

  for (let font of fontsToLoad) {
    window.loadedFont.push(font);
  }
}
