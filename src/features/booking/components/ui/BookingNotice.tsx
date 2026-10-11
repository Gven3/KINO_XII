export function BookingNotice({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="w-full p-3 rounded-[10px] bg-warning/10 text-warning text-label-m"
    >
      {message}
    </p>
  );
}
