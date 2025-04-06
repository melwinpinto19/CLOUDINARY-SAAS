"use client";
import { SingleVideoCard } from "@/types";
import { formatSize } from "@/utils";
import React from "react";

function VideoCard({ card }: { card: SingleVideoCard }) {
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
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="mt-[10px] flex gap-[15px]">
          <div className="badge badge-primary px-[15px] py-[10px]">
            {`${originalSizeSize} ${originalSizeType}`}
          </div>
          <div className="badge badge-secondary px-[15px] py-[10px]">{`${compressedSizeSize} ${compressedSizeType}`}</div>
        </div>
        <div className="card-actions justify-end">
          {/* <button className="btn btn-primary">Buy Now</button> */}
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
