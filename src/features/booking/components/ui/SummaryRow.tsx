type SummaryRowProps = {
  label: string;
  value: string;
};

export function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted text-body-m">{label}</span>
      <span className="text-white text-label-m">{value}</span>
    </div>
  );
}
