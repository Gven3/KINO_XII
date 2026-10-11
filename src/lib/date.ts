export function parseDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);

  if (year === undefined || month === undefined || day === undefined) {
    throw new Error(`Invalid date: ${isoDate}`);
  }

  return new Date(year, month - 1, day);
}
const weekdayFormatter = new Intl.DateTimeFormat("en-GB", { weekday: "short" });

export type DayOption = {
  value: string;
  weekday: string;
  day: number;
};

export function toDayOptions(dates: string[]): DayOption[] {
  return dates.map((value) => {
    const date = parseDate(value);
    return {
      value,
      weekday: weekdayFormatter.format(date),
      day: date.getDate(),
    };
  });
}
