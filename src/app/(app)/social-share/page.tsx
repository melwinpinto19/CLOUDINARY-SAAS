"use client";

import useImageUpload from "@/hooks/useImageUpload";

function SocialShare() {
  const { uploading, transforming, selectedFormat } = useImageUpload();

  return <div>SocialShare</div>;
}

export default SocialShare;
