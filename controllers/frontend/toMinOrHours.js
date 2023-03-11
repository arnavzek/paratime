export default function toMinsOrHours(data) {
  let sec = parseInt(data) * 30;
  let min = sec / 60;
  min = Math.floor(min);

  if (min > 60) {
    let hour = min / 60;
    hour = Math.floor(hour);
    return hour + " Hours";
  }

  return min + " Mins";
}
