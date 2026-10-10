import success_icon from "@/assets/icons/success.svg";

export function ProfileStatus({ activated }: { activated: boolean }) {
  return (
    <div
      className={`w-full p-3 flex flex-col gap-0.5 ${activated ? "bg-success/10" : "bg-warning/10"} rounded-[10px]`}
    >
      {activated ? (
        <div className="flex gap-1.5 items-center">
          <span className="text-success text-label-m">Profile complete</span>
          <img src={success_icon} alt="" />
        </div>
      ) : (
        <>
          <span className="text-warning text-label-m">Profile incomplete</span>
          <p className="text-muted text-body-s">
            Please complete your profile to enable booking
          </p>
        </>
      )}
    </div>
  );
}
