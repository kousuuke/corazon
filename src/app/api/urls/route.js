import { NextResponse } from "next/server";
import { createShortUrl } from "../../../services/url.service";

export async function POST(request) {
  try {
    const body = await request.json();
    const { originalUrl } = body;

    if (!originalUrl) {
      return NextResponse.json(
        { message: "Original URL is required," },
        { status: 400 }
      );
    }

    const newShortUrl = await createShortUrl(originalUrl);

    return NextResponse.json(
      {
        id: newShortUrl._id,
        originalUrl: newShortUrl.originalUrl,
        shortCode: newShortUrl.shortCode,

        shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${newShortUrl.shortCode}`,
        clicks: newShortUrl.clicks,
        createdAt: newShortUrl.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating short URL:", error);
    return NextResponse.json(
      { message: "Internal Server Error: POST request" },
      { status: 500 }
    );
  }
}
