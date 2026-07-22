import { NextResponse } from "next/server";

type Enquiry = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  location?: string;
  message?: string;
  website?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: Enquiry;

  try {
    body = (await request.json()) as Enquiry;
  } catch {
    return NextResponse.json({ message: "The submitted data is invalid." }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ message: "Thank you. Your project enquiry has been received." });
  }

  const enquiry = {
    name: clean(body.name, 100),
    company: clean(body.company, 150),
    email: clean(body.email, 180),
    phone: clean(body.phone, 60),
    projectType: clean(body.projectType, 120),
    location: clean(body.location, 160),
    message: clean(body.message, 4000),
  };

  if (!enquiry.name || !emailPattern.test(enquiry.email) || !enquiry.projectType || !enquiry.location || !enquiry.message) {
    return NextResponse.json({ message: "Please complete all required fields with valid information." }, { status: 422 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { message: "Online enquiries are temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...enquiry, source: "eco-magistral-website" }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) throw new Error("Webhook rejected the request");

    return NextResponse.json(
      { message: "Thank you. Your project enquiry has been received." },
      { status: 202 },
    );
  } catch {
    return NextResponse.json(
      { message: "The enquiry could not be sent. Please try again later." },
      { status: 502 },
    );
  }
}
