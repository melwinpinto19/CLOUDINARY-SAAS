import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const videos = await prisma.video.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(videos, {
      status: 200,
      statusText: "fetched all videos successfully",
    });
  } catch (error) {
  } finally {
    await prisma.$disconnect();
  }
}
