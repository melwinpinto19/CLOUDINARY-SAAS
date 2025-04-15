"use client";
import { getVideos } from "@/api/video";
import VideoCard from "@/components/VideoCard";
import React, { useEffect, useState } from "react";

function page() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const response = await getVideos();

      if (!response.error) {
        setVideos(response.data.data);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading)
    return (
      <div className="p-[30px] flex flex-wrap gap-4 justify-center">
        {Array.from({ length: 10 }, (_, index) => (
          <div className="skeleton h-[300px] w-96" key={index}></div>
        ))}
      </div>
    );

  return (
    <div className="p-[30px]">
      {/* <h1>Videos</h1> */}
      <div className="flex flex-wrap gap-4 mt-4">
        {videos.length > 0 &&
          videos.map((video: any, index) => (
            <VideoCard card={video} key={index} />
          ))}
      </div>
    </div>
  );
}

export default page;
