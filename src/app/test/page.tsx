"use client";
import { useState } from "react";

export default function VideoPreview() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      {/* Input de vídeo */}
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="block text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-xl file:border-0
                   file:text-sm file:font-semibold
                   file:bg-green-50 file:text-green-700
                   hover:file:bg-green-100"
      />

      {/* Preview do vídeo */}
      {videoUrl && (
        <video
          src={videoUrl}
          controls
          className="rounded-xl shadow-lg w-full max-w-lg"
        />
      )}
    </div>
  );
}
