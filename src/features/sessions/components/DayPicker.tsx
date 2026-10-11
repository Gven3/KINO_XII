import { useState } from "react";

type DayPickerProps = {
  dates: { value: string; weekday: string; day: number }[];
  currentDate: string | undefined;
  setCurrentDate: (date: string) => void;
};

export function DayPicker({
  dates,
  currentDate,
  setCurrentDate,
}: DayPickerProps) {
  return (
    <div className="flex items-center gap-2">
      {dates.map((date, i) => (
        <button
          key={i}
          className={`h-20 flex flex-col items-center gap-1.5 justify-center rounded-2xl cursor-pointer ${currentDate === date.value ? "w-25 bg-primary" : "w-20 bg-surface"} transition-[color,width] duration-200`}
          onClick={() => setCurrentDate(date.value)}
        >
          <span className="text-white text-label-s">{date.weekday}</span>
          <span className="text-white text-h3">{date.day}</span>
        </button>
      ))}
    </div>
  );
}
