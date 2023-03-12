import toMinsOrHours from "./toMinOrHours";

export default function getTodaysDuration(dailyUsageStat) {
  if (!dailyUsageStat) return toMinsOrHours({ unparsedMinutes: 0 });

  let today = new Date();

  let dateString = `${
    today.getMonth() + 1
  }/${today.getDate()}/${today.getFullYear()}`;

  let item = dailyUsageStat[dateString];

  return toMinsOrHours({ unparsedMinutes: item });
}
