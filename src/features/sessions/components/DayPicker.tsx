type DayPickerSize = "lg" | "sm";

const SIZE_STYLES: Record<
  DayPickerSize,
  { list: string; day: string; active: string; idle: string; number: string }
> = {
  lg: {
    list: "gap-2",
    day: "h-20 rounded-2xl transition-[color,width] duration-200",
    active: "w-25 bg-primary",
    idle: "w-20 bg-surface",
    number: "text-h3",
  },
  sm: {
    list: "gap-1.5 overflow-x-auto [scrollbar-width:none]",
    day: "h-15 w-11 shrink-0 rounded-[10px] transition-colors duration-200",
    active: "bg-primary",
    idle: "bg-surface-light",
    number: "text-label-s",
  },
};

type DayPickerProps = {
  dates: { value: string; weekday: string; day: number }[];
  currentDate: string | undefined;
  setCurrentDate: (date: string) => void;
  size?: DayPickerSize;
};

export function DayPicker({
  dates,
  currentDate,
  setCurrentDate,
  size = "lg",
}: DayPickerProps) {
  const styles = SIZE_STYLES[size];
  return (
    <div className={`flex items-center ${styles.list}`}>
      {dates.map((date, i) => (
        <button
          key={i}
          type="button"
          className={`flex flex-col items-center gap-1.5 justify-center cursor-pointer ${styles.day} ${currentDate === date.value ? styles.active : styles.idle}`}
          onClick={() => setCurrentDate(date.value)}
        >
          <span className="text-white text-label-s">{date.weekday}</span>
          <span className={`text-white ${styles.number}`}>{date.day}</span>
        </button>
      ))}
    </div>
  );
}
