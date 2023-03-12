import toMinsOrHours from "./toMinOrHours";

export default function getMonthsDuration(dailyUsageStat) {
  let data = [];
  let totalMin = 0;

  for (let key in dailyUsageStat) {
    let item = dailyUsageStat[key];
    let date = new Date(key);
    if (thisMonth !== date.getMonth()) continue;

    let item1 = parseInt(item);
    totalMin += item1;
  }

  return toMinsOrHours({ unparsedMinutes: data });
}
