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

const longDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatLongDate(isoDate: string) {
  return longDateFormatter.format(parseDate(isoDate));
}

export function toIsoDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function getNextDays(count: number) {
  const today = new Date();
  return Array.from({ length: count }, (_, i) =>
    toIsoDate(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + i),
    ),
  );
}

const dayDateFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
});
// en-GB writes September as "Sept", the design wants "Sep".
const shortMonthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
});

// "Tuesday 15 September"
export function formatDayDate(isoDate: string) {
  return dayDateFormatter.format(parseDate(isoDate));
}

// "Tue 15 Sep"
export function formatShortDayDate(isoDate: string) {
  const date = parseDate(isoDate);
  return `${weekdayFormatter.format(date)} ${date.getDate()} ${shortMonthFormatter.format(date)}`;
}
