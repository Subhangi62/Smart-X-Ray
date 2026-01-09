import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/schemas/contact";
import { resend } from "@/lib/resend";
import { ContactEmail } from "@/lib/emails/contact-email";
import { ZodError } from "zod";

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured. Please contact the administrator." },
        { status: 500 }
      );
    }

    // Parse request body
    const body: ContactEmailRequest = await request.json();

    // Validate input
    const validatedData = contactFormSchema.parse({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    });

    // Send emails to both developers
    const emailPromises = [
      resend.emails.send({
        from: "Smart X-Ray System <onboarding@resend.dev>",
        to: ["udithmayannagowda@gmail.com"],
        subject: `Contact Form: ${validatedData.subject}`,
        react: ContactEmail({
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
          message: validatedData.message,
        }),
      }),
      resend.emails.send({
        from: "Smart X-Ray System <onboarding@resend.dev>",
        to: ["shivanisughnanamurthy5@gmail.com"],
        subject: `Contact Form: ${validatedData.subject}`,
        react: ContactEmail({
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
          message: validatedData.message,
        }),
      })
    ];

    const results = await Promise.allSettled(emailPromises);
    
    // Check if at least one email was sent successfully
    const successfulSends = results.filter(r => r.status === 'fulfilled');
    
    if (successfulSends.length === 0) {
      console.error("All email sends failed:", results);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    // Log any failures but still return success if at least one email went through
    results.forEach((result, index) => {
      const recipient = index === 0 ? "udithmayannagowda@gmail.com" : "shivanisughnanamurthy5@gmail.com";
      if (result.status === 'rejected') {
        console.warn(`Failed to send email to ${recipient}:`, result.reason);
      }
    });

    return NextResponse.json(
      { 
        success: true,
        message: `Your message has been sent to our development team (${successfulSends.length}/2 developers notified)!`
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    // Handle unexpected errors
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}