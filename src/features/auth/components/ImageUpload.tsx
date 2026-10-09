import upload_icon from "@/assets/icons/upload.svg";
import { useState, type ChangeEvent } from "react";

export const ACCEPTED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];

type ImageUploadProps = {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
};
export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";
    onChange(file);

    if (!file || !ACCEPTED_AVATAR_TYPES.includes(file.type)) {
      setPreviewUrl(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const shownPreview = value ? previewUrl : null;
  return (
    <div className="flex flex-col gap-1 mb-2 w-max">
      <label
        htmlFor="upload"
        className="flex items-center gap-3 cursor-pointer"
      >
        <input
          type="file"
          className="sr-only"
          id="upload"
          accept={ACCEPTED_AVATAR_TYPES.join(",")}
          onChange={handleFileChange}
        />
        <span className="size-10 rounded-lg bg-surface flex items-center justify-center overflow-hidden">
          {shownPreview ? (
            <img
              src={shownPreview}
              alt="Avatar preview"
              className="size-full object-cover"
            />
          ) : (
            <img src={upload_icon} alt="" />
          )}
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-white text-button">
            Upload avatar (optional)
          </span>
          <span className="text-muted text-body-s">JPG, PNG or WEBP</span>
        </div>
      </label>
    </div>
  );
}
