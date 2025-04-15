"use client";
import { SingleVideoCard } from "@/types";
import { formatSize } from "@/utils";
import React, { useState } from "react";
import { FileText } from "lucide-react";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";

function VideoCard({ card }: { card: SingleVideoCard }) {
  const [isHovered, setIsHovered] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const {
    title,
    description,
    publicId,
    createdAt,
    originalSize,
    compressedSize,
  } = card;
  const { type: originalSizeType, size: originalSizeSize } =
    formatSize(originalSize);
  const { type: compressedSizeType, size: compressedSizeSize } =
    formatSize(compressedSize);

  const getThumbnailUrl = () => {
    return getCldImageUrl({
      src: publicId,
      height: 200,
      width: 200,
      crop: "fill",
      gravity: "auto",
      format: "jpg",
      assetType: "video",
    });
  };

  const getVideoUrl = () => {
    return getCldVideoUrl({
      src: publicId,
      height: 200,
      width: 384,
      rawTransformations: ["e_preview:duration_15"],
    });
  };
  return (
    <div
      className="card bg-neutral w-96 shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered && (
        <figure className="relative w-full  overflow-hidden">
          <img
            src={getThumbnailUrl()}
            alt={title}
            className="w-[384px] h-[200px]"
          />
        </figure>
      )}
      {isHovered && (
        <video
          className="w-[384px] h-[200px] object-cover"
          autoPlay
          playsInline
          onMouseLeave={() => setIsHovered(false)}
          onError={() => setPreviewError(true)}
          src={getVideoUrl()}
        />
      )}
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="flex flex-col items-start gap-[10px] w-[50%]">
            <span className="text-xs font-medium text-gray-500 mb-1">
              Original Size
            </span>
            <div className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-100 text-blue-800 rounded-full">
              <FileText className="w-4 h-4" />
              {`${originalSizeSize} ${originalSizeType}`}
            </div>
          </div>
          <div className="flex flex-col items-start gap-[10px] w-[50%]">
            <span className="text-xs font-medium text-gray-500 mb-1">
              Compressed Size
            </span>
            <div className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-purple-100 text-purple-800 rounded-full">
              <FileText className="w-4 h-4" />
              {`${compressedSizeSize} ${compressedSizeType}`}
            </div>
          </div>
        </div>

        <div className="card-actions justify-start mt-[30px]">
          <button className="btn btn-primary">Download Video</button>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
