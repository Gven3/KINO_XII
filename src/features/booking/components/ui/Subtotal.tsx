type SubtotalProps = {
  label?: string;
  amount: number;
};

export function Subtotal({ label = "Subtotal", amount }: SubtotalProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white text-label-m uppercase">{label}</span>
      <span className="text-white text-h1">₾ {amount}</span>
    </div>
  );
}
