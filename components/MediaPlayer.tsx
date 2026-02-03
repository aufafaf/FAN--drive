"use client";

import { MediaFile } from "@/types";
import { useState } from "react";

interface MediaPlayerProps {
  media: MediaFile & { webViewLink?: string };
}

export default function MediaPlayer({ media }: MediaPlayerProps) {
  const [imageError, setImageError] = useState(false);

  // if (media.isVideo) {
  //   return (
  //     <div className="media-player">
  //       <video
  //         controls
  //         className="video-player"
  //         // poster={media.thumbnailLink}
  //         poster={media.thumbnailLink || undefined}

  //       >
  //         {/* <source src={media.webContentLink} type={media.mimeType} /> */}
  //         <source src={media.webContentLink ?? undefined} type={media.mimeType} />

  //         Browser Anda tidak mendukung video player.
  //       </video>
  //     </div>
  //   );
  // }

  if (media.isVideo) {
    return (
      <div className="media-player">
        <iframe
          src={`https://drive.google.com/file/d/${media.id}/preview`}
          className="video-embed"
          allow="autoplay"
          allowFullScreen
        />
      </div>
    );
  }

  if (media.isImage) {
    return (
      <div className="media-player">
        {!imageError ? (
          <img
            // src={media.webContentLink || media.thumbnailLink}
            src={media.webContentLink ?? media.thumbnailLink ?? undefined}
            alt={media.name}
            className="image-viewer"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="image-error">
            <p>Tidak dapat memuat gambar</p>
            {media.thumbnailLink && (
              <img
                src={media.thumbnailLink}
                alt={media.name}
                className="thumbnail-fallback"
              />
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="media-player">
      <p>Format media tidak didukung</p>
    </div>
  );
}
