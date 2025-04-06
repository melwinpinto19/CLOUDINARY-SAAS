export interface imageUploadResponse {
  public_id: string;
  [key: string]: any;
}

export interface videoUploadResponse {
  public_id: string;
  bytes: number;
  duration?: number;
}

export interface SingleVideoCard {
  _id: string;
  title: string;
  description: string;
  publicId: string;
  originalSize: number;
  duration: number;
  compressedSize: number;
  createdAt: string;
  updatedAt: string;
}
