import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import ApiResponse from "@/utils/ApiResponse";
import { imageUploadResponse } from "@/types";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    // Authenticate the user
    const { userId } = await auth();

    // Check if the user is authenticated
    if (!userId) {
      return NextResponse.json(new ApiResponse(401, "Unauthorized", null), {
        status: 401,
      });
    }

    // get the formdata:
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    // Check if the file is provided
    if (!file) {
      return NextResponse.json(new ApiResponse(400, "No file provided", null), {
        status: 400,
      });
    }

    // get the buffer from the file:
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload the image to Cloudinary
    const uploadResponse = await new Promise<imageUploadResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "cloudinary-saas-images",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as imageUploadResponse);
            }
          }
        );

        uploadStream.end(buffer);
      }
    );

    return NextResponse.json(
      new ApiResponse(200, "Image uploaded successfully", uploadResponse),
      {
        status: 200,
        statusText: "Image uploaded successfully",
      }
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      new ApiResponse(500, "Internal server error", null),
      {
        status: 500,
        statusText: "Internal server error",
      }
    );
  }
}
