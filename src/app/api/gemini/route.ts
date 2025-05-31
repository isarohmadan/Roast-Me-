import { NextResponse } from "next/server";
import scrapDataApify from "@/services/scrapDataApify";
import { analyzeInstagramProfile } from "@/services/geminiService";

export async function POST(request: Request) {
  try {
    const { url, language } = await request.json();

    if (!url) {
      return new NextResponse("Missing URL parameter", { status: 400 });
    }
    const data = await scrapDataApify(url);
    if (data.error) {
      return NextResponse.json(data, { status: 400 });
    }

    const analysis = await analyzeInstagramProfile(data, {
      language,
      url,
    });

    return NextResponse.json(analysis);
  } catch (error) {
    return new NextResponse("Error processing request", { status: 500 });
  }
}
