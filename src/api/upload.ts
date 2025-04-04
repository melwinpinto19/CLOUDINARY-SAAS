import { imageUploadResponse } from "@/types";
import { api } from "./instance";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return await api.post<imageUploadResponse>(
    "/api/v1/upload/image",
    formData,
    {}
  );
};
