import { api } from "./instance";

export const getVideos = async () => {
  return await api.get("/api/v1/videos", {}, {});
};
