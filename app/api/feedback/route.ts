import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { feedback, suggestions, name, email, whatsapp } = body;

    if (!feedback || !suggestions) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (
      typeof feedback !== "string" ||
      typeof suggestions !== "string" ||
      (name !== undefined && typeof name !== "string") ||
      (email !== undefined && typeof email !== "string") ||
      (whatsapp !== undefined && typeof whatsapp !== "string")
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid input types" },
        { status: 400 }
      );
    }

    const feedbackValue = feedback.trim();
    const suggestionsValue = suggestions.trim();
    const nameValue = String(name ?? "").trim();
    const emailValue = String(email ?? "").trim();
    const whatsappValue = String(whatsapp ?? "").trim();

    if (!feedbackValue || !suggestionsValue) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (
      feedbackValue.length > 1000 ||
      suggestionsValue.length > 1000 ||
      nameValue.length > 100 ||
      emailValue.length > 100 ||
      whatsappValue.length > 20
    ) {
      return NextResponse.json(
        { success: false, error: "Input too long" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_FEEDBACK_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("GOOGLE_SHEETS_FEEDBACK_WEBHOOK_URL is not set");
      return NextResponse.json(
        { success: false, error: "Server misconfigured" },
        { status: 500 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feedback: escapeJson(feedbackValue),
        suggestions: escapeJson(suggestionsValue),
        name: escapeJson(nameValue),
        email: escapeJson(emailValue),
        whatsapp: escapeJson(whatsappValue),
      }),
    });

    if (!response.ok) {
      console.error("Google Sheets webhook error:", {
        status: response.status,
        statusText: response.statusText,
      });
      return NextResponse.json(
        { success: false, error: "Failed to record feedback" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Feedback submission error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

function escapeJson(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
  };
  return text.replace(/[&<>"'\n\r\t]/g, (char) => map[char]);
}
