"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, Trash2 } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";

export type ProfilePhoto = {
  url: string;
  key: string;
  uploadedAt: number;
};

type PhotoUploaderProps = {
  photos: ProfilePhoto[];
  onAddPhoto: (photo: { url: string; key: string }) => Promise<void>;
  onRemovePhoto: (key: string) => Promise<void>;
  disabled?: boolean;
};

export function PhotoUploader({
  photos,
  onAddPhoto,
  onRemovePhoto,
  disabled,
}: PhotoUploaderProps) {
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadComplete = async (
    uploaded: Array<{
      key: string;
      ufsUrl?: string;
      url?: string;
      serverData?: {
        key: string;
        url: string;
      };
    }>,
  ) => {
    setError(null);
    setIsWorking(true);

    try {
      for (const file of uploaded) {
        const key = file.serverData?.key ?? file.key;
        const url = file.serverData?.url ?? file.ufsUrl ?? file.url;

        if (!key || !url) continue;
        await onAddPhoto({ key, url });
      }
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Could not save photo. Try again.",
      );
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {photos.map((photo) => (
          <div
            key={photo.key}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-muted/20"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={photo.url}
                alt="Profile upload"
                fill
                sizes="(max-width: 640px) 45vw, 160px"
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setError(null);
                void onRemovePhoto(photo.key).catch((removeError) => {
                  setError(
                    removeError instanceof Error
                      ? removeError.message
                      : "Could not remove photo.",
                  );
                });
              }}
              className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/50 text-white opacity-0 transition group-hover:opacity-100"
              aria-label="Remove photo"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {photos.length < 4 ? (
        <UploadButton
          endpoint="profilePhotoUploader"
          disabled={disabled || isWorking}
          onClientUploadComplete={(results) => {
            void handleUploadComplete(results);
          }}
          onUploadError={(uploadError: Error) => {
            setError(uploadError.message);
          }}
          className="ut-button:h-10 ut-button:rounded-xl ut-button:bg-primary ut-button:px-4 ut-button:text-sm ut-button:font-medium ut-button:text-primary-foreground ut-button:hover:bg-primary/90 ut-allowed-content:text-xs ut-allowed-content:text-muted-foreground"
        />
      ) : (
        <p className="rounded-xl border border-border/70 bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
          You reached the 4 photo limit.
        </p>
      )}

      {isWorking ? (
        <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Saving photo...
        </p>
      ) : null}

      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : null}

      <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/15 px-3 py-2 text-xs text-muted-foreground">
        <span>Required: at least 1 photo</span>
        <span>{photos.length}/4</span>
      </div>
    </div>
  );
}
