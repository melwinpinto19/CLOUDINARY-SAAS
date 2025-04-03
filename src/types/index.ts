export interface imageUploadResponse {
  public_id: string;
  [key: string]: any;
}

export interface videoUploadResponse {
  public_id: string;
  bytes: number;
  duration?: number;
}
