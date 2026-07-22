import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, prename, contactMethod, church, eventSlug } = body;

    if (!name || !prename || !contactMethod || !church || !eventSlug) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (
      name.length > 200 ||
      prename.length > 200 ||
      contactMethod.length > 200 ||
      church.length > 200 ||
      eventSlug.length > 200
    ) {
      return NextResponse.json(
        { success: false, error: "Input too long" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_INTEREST_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("GOOGLE_SHEETS_INTEREST_WEBHOOK_URL is not set");
      return NextResponse.json(
        { success: false, error: "Server misconfigured" },
        { status: 500 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, prename, contactMethod, church, eventSlug }),
    });

    if (!response.ok) {
      console.error("Google Sheets webhook error:", response.status);
      return NextResponse.json(
        { success: false, error: "Failed to record interest" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Register interest error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
