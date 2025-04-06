"use client";
import { getVideos } from "@/api/video";
import VideoCard from "@/components/VideoCard";
import React, { useEffect, useState } from "react";

function page() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await getVideos();

      if (!response.error) {
        setVideos(response.data.data);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="p-[30px]">
      <h1>Videos</h1>
      <div className="flex flex-wrap gap-4 mt-4">
        {videos.length > 0 &&
          videos.map((video: any) => <VideoCard card={video} />)}
      </div>
    </div>
  );
}

export default page;
