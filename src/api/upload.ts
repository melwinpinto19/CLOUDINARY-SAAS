import { api } from "./instance";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return await api.post("/api/v1/upload/image", formData, {});
};

export const uploadVideo = async (
  title: string,
  description: string,
  file: File
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("file", file);
  formData.append("originalSize", file.size.toString());

  return await api.post("/api/v1/upload/video", formData, {});
};
