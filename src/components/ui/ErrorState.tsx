import { Button } from "./Button";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
  isRetrying?: boolean;
};

export function ErrorState({
  message,
  onRetry,
  isRetrying = false,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="w-full py-10 px-6 flex flex-col items-center gap-4 rounded-[20px] bg-surface text-center"
    >
      <p className="text-white text-body-l">{message}</p>
      <Button onClick={onRetry} disabled={isRetrying}>
        {isRetrying ? "Retrying..." : "Try again"}
      </Button>
    </div>
  );
}
