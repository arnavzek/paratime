import attachGetWeekNumFeature from "./attachGetWeekNumFeature";
import toMinsOrHours from "./toMinOrHours";

export default function getWeeksDuration(dailyUsageStat) {
  attachGetWeekNumFeature();

  let data = [];
  let totalMin = 0;

  let today = new Date();

  for (let key in dailyUsageStat) {
    let item = dailyUsageStat[key];
    let date = new Date(key);
    if (today.getWeek() !== date.getWeek()) continue;

    let item1 = parseInt(item);
    totalMin += item1;
  }

  return toMinsOrHours({ unparsedMinutes: data });
}
