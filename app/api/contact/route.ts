import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const CONTACT_EMAIL = "contact.tinericrestini@gmail.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, contact, message } = body;

    // Validate inputs
    if (!name || !contact || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (name.length > 200 || contact.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Input too long" },
        { status: 400 }
      );
    }

    // Send email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: "Tinerii lui Dumnezeu <noreply@tinericrestini.uk>",
      to: CONTACT_EMAIL,
      subject: `New inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Inquiry from the Website</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Contact:</strong> ${escapeHtml(contact)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 4px;">
            ${escapeHtml(message)}
          </p>
          <p style="font-size: 12px; color: #999; margin-top: 20px;">
            Received: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { success: false, error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
