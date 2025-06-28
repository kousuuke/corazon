import { NextResponse } from "next/server";
import { Url } from "../../../../lib/urls.model.js";
import { connectToMongoDB } from "../../../../lib/mongodb.connection.js";

export async function GET(request, { params }) {
  await connectToMongoDB();
  try {
    const { id } = await params;
    console.log("Fetched ID:", id);
    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is required." },
        { status: 400 }
      );
    }
    const url = await Url.findById(id);
    if (!url) {
      return NextResponse.json({ error: "URL not found." }, { status: 404 });
    }
    return NextResponse.json(url, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error: GET ID request failed." },
      { status: 500 }
    );
  }
}
