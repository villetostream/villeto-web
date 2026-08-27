import { NextResponse } from "next/server";
import { z } from "zod";

const RECIPIENT_EMAIL = "info@villeto.com";

const demoRequestSchema = z.object({
  name: z.string().trim().min(2).max(100).refine((value) => !/[\r\n]/.test(value)),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(32).refine((value) => !/[\r\n]/.test(value)),
  company: z.string().trim().min(2).max(120).refine((value) => !/[\r\n]/.test(value)),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(200).optional().default(""),
});

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character] ?? character;
  });
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = demoRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Please complete every field with valid information." }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ success: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.DEMO_REQUEST_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    console.error("Demo request email is not configured. Set RESEND_API_KEY and DEMO_REQUEST_FROM_EMAIL.");
    return NextResponse.json({ error: "Demo requests are temporarily unavailable. Please try again later." }, { status: 503 });
  }

  const { name, email, phone, company, message } = parsed.data;
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    company: escapeHtml(company),
    message: escapeHtml(message).replace(/\n/g, "<br />"),
  };

  let response: Response;

  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [RECIPIENT_EMAIL],
        reply_to: email,
        subject: `Villeto guided walkthrough request from ${company}`,
        text: [
          "New guided walkthrough request",
          "",
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Company: ${company}`,
          "",
          "Request:",
          message,
        ].join("\n"),
        html: `
          <h2>New guided walkthrough request</h2>
          <p><strong>Name:</strong> ${safe.name}</p>
          <p><strong>Email:</strong> ${safe.email}</p>
          <p><strong>Phone:</strong> ${safe.phone}</p>
          <p><strong>Company:</strong> ${safe.company}</p>
          <p><strong>Request:</strong></p>
          <p>${safe.message}</p>
        `,
      }),
    });
  } catch (sendError) {
    console.error("Resend could not be reached for a demo request.", sendError);
    return NextResponse.json({ error: "We could not send your request. Please try again." }, { status: 502 });
  }

  if (!response.ok) {
    console.error("Resend rejected a demo request email.", response.status, await response.text());
    return NextResponse.json({ error: "We could not send your request. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
