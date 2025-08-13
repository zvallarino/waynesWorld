// Ensure Node runtime (safer for SDKs)
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// tiny sanitizer for HTML interpolation
const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (m) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]));

export async function POST(req) {
  try {
    const { firstName = "", lastName = "", email = "", message = "" } = await req.json();
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const fullName = `${firstName} ${lastName}`.trim();

    const { error } = await resend.emails.send({
      from: "WaynesWorld Contact <onboarding@resend.dev>", // use your domain later
      to: "zvcoding@gmail.com",                           // or wherever you want it
      reply_to: email,
      subject: `New message from ${fullName}`,
      text: `${message}\n\nFrom: ${fullName} <${email}>`,
      html: `
        <div style="font-family:system-ui,Arial,sans-serif;line-height:1.5">
          <h2 style="margin:0 0 12px 0">New contact message</h2>
          <p>${esc(message).replace(/\n/g, "<br/>")}</p>
          <hr style="margin:16px 0;border:none;border-top:1px solid #eee"/>
          <p><strong>From:</strong> ${esc(fullName)} &lt;${esc(email)}&gt;</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Email provider error." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}

// Optional quick ping to verify the route is live
export async function GET() {
  return NextResponse.json({ ok: true });
}