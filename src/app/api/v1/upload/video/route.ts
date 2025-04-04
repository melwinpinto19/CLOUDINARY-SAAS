import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import ApiResponse from "@/utils/ApiResponse";
import { imageUploadResponse, videoUploadResponse } from "@/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const originalSize = formData.get("originalSize") as string;

    // Check if the file is provided
    if (!file) {
      return NextResponse.json(new ApiResponse(400, "No file provided", null), {
        status: 400,
      });
    }

    // get the buffer from the file:
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload the video to Cloudinary
    const uploadResponse = await new Promise<videoUploadResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: "cloudinary-saas-videos",
            transformation: [{ quality: "auto", fetch_format: "mp4" }],
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as videoUploadResponse);
            }
          }
        );

        uploadStream.end(buffer);
      }
    );

    // create a new video in the database :
    const video = await prisma.video.create({
      data: {
        title,
        description,
        originalSize,
        publicId: uploadResponse.public_id,
        compressedSize: String(uploadResponse.bytes),
        duration: uploadResponse.duration || 0,
      },
    });

    return NextResponse.json(
      new ApiResponse(200, "Video uploaded successfully", video),
      {
        status: 200,
        statusText: "Video uploaded successfully",
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
