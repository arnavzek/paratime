export default function toMinsOrHours({ unparsedSeconds, unparsedMinutes }) {
  let min = 0;

  if (unparsedMinutes) {
    let min = parseInt(unparsedMinutes);
    min = Math.floor(min);
  } else {
    let sec = parseInt(unparsedSeconds);

    let min = sec / 60;
    min = Math.floor(min);
  }

  if (min > 60) {
    let hour = min / 60;
    hour = Math.floor(hour);
    return hour + " Hours";
  }

  return min + " Mins";
}
