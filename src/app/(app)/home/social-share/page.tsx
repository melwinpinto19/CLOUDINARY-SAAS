"use client";

import useImageUpload from "@/hooks/useImageUpload";
import { CldImage } from "next-cloudinary";

function SocialShare() {
  const {
    uploading,
    transforming,
    selectedFormat,
    socialFormats,
    setSelectedFormat,
    image,
    uploadedImage,
    handleImageUpload,
    setTransforming,
    downloadImage,
  } = useImageUpload();

  return (
    <div
      className="flex flex-col items-center gap-[30px] pt-[60px]"
      style={{ height: "calc(100vh - 50px)" }}
    >
      {/* heading */}
      <h2 className="text-2xl w-full text-center">
        Social Media Image Generator
      </h2>

      {/* main form */}
      <div className="p-[20px] w-[60%] flex flex-col gap-[30px]">
        {/* file upload input */}
        <div className="flex flex-col gap-[10px]">
          {" "}
          <label htmlFor="file">Choose a image to upload :</label>
          <input
            type="file"
            className="file-input w-full"
            id="file"
            onChange={handleImageUpload}
          />
        </div>
        {/* progress while uploading */}
        {uploading && <progress className="progress w-full"></progress>}
        {/* image resolution selection */}
        {uploadedImage && (
          <div className="flex flex-col gap-[10px]">
            {" "}
            <label htmlFor="select">Select the resolution :</label>
            <select
              id="select"
              className="select select-secondary w-full"
              onChange={(e) => {
                setSelectedFormat(e.target.value as keyof typeof socialFormats);
              }}
              value={selectedFormat}
            >
              <option disabled={true}>Choose the image resolution"</option>
              {Object.keys(socialFormats).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* image preview */}
        {uploadedImage && (
          <div className="relative flex justify-center items-center">
            <CldImage
              alt="cloudinary image"
              width={socialFormats[selectedFormat].width}
              height={socialFormats[selectedFormat].height}
              aspectRatio={socialFormats[selectedFormat].aspectRatio}
              src={uploadedImage || ""}
              sizes="100vw"
              crop="fill"
              gravity="auto"
              ref={image}
              onLoad={() => setTransforming(false)}
            />
            {transforming && (
              <div
                className="flex justify-center items-center  opacity-50 absolute  z-10"
                style={{
                  width: socialFormats[selectedFormat].width,
                  height: socialFormats[selectedFormat].height,
                }}
              >
                <span className="loading loading-ring loading-xl"></span>
              </div>
            )}
          </div>
        )}

        {/* download button */}
        {uploadedImage && (
          <div className="flex flex-col gap-[10px]" onClick={downloadImage}>
            <button className="btn btn-primary">Download Image</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SocialShare;
