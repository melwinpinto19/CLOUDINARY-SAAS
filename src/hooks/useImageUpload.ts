"use client";
import { uploadImage } from "@/api/upload";
import axios from "axios";
import React, { useRef, useState } from "react";

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};

type SocialFormat = keyof typeof socialFormats;

export default function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
    "Instagram Square (1:1)"
  );
  const [transforming, setTransforming] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const image = useRef<HTMLImageElement | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // get the file :
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setUploading(true);

    // upload the image :
    const response = await uploadImage(file);

    // check if the response is successful
    if (!response.error) {
      setUploading(false);
      setUploadedImage(response.data.data.public_id);
    }
  };

  const downloadImage = async () => {
    if (!image.current) {
      return;
    }

    const src = image.current.src;

    // get the blob of the image from the src
    const response = await axios.get(src, { responseType: "blob" });

    // create a blob url from the response
    const url = URL.createObjectURL(response.data);

    // create a link element and set the href to the blob url for download
    const link = document.createElement("a");
    link.href = url;
    link.download = "cloudinary_saas_image.png";

    // download the image
    link.click();

    // clean up the blob url after downloadF
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return {
    uploading,
    selectedFormat,
    transforming,
    image,
    handleImageUpload,
    downloadImage,
    socialFormats,
    setSelectedFormat,
    uploadedImage,
  };
}
