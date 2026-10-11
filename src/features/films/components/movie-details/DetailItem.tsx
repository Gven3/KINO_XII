type DetailItemProps = {
  label: string;
  value: string;
};

export function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-muted text-label-s uppercase">{label}</span>
      <span className="text-white text-label-m">{value}</span>
    </div>
  );
}
