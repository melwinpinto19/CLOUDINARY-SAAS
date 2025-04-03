import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import ApiResponse from "@/utils/ApiResponse";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      new ApiResponse(200, "fetched all videos", videos),
      {
        status: 200,
        statusText: "fetched all videos successfully",
      }
    );
  } catch (error) {
  } finally {
    await prisma.$disconnect();
  }
}
