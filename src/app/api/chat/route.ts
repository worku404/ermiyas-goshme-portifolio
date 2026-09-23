import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/ai/rateLimiter";
import { sendToGeminiWithKeyRotation, ChatMessagePayload } from "@/lib/ai/geminiClient";

/**
 * AI Assistant Chat Endpoint
 *
 * Route: POST /api/chat
 * Features:
 * - IP-based throttling / rate limiting.
 * - Input validation & sanitation.
 * - Key rotation across API1_KEY..API8_KEY.
 * - Strict grounding in Ermiyas Goshme's portfolio context.
 */
export async function POST(req: Request) {
  try {
    // 1. Enforce IP-based rate limiting
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(clientIp);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Rate limit exceeded. Please wait ${rateLimit.retryAfterSeconds} seconds before sending another message.`,
          retryAfter: rateLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
          },
        }
      );
    }

    // 2. Parse and validate JSON payload
    const body = await req.json().catch(() => null);
    if (!body || typeof body.message !== "string" || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: "Invalid message payload. A non-empty text message is required." },
        { status: 400 }
      );
    }

    const userMessage = body.message.trim();
    if (userMessage.length > 800) {
      return NextResponse.json(
        { error: "Message is too long. Please limit your message to 800 characters." },
        { status: 400 }
      );
    }

    const history: ChatMessagePayload[] = Array.isArray(body.history)
      ? body.history.slice(-10) // keep last 10 messages for context
      : [];

    // 3. Invoke Gemini with key rotation
    const result = await sendToGeminiWithKeyRotation(userMessage, history);

    return NextResponse.json({
      reply: result.text,
      remainingRequests: rateLimit.remaining,
      keyIndexUsed: result.keyUsedIndex,
    });
  } catch (error) {
    console.error("[/api/chat Error]:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to generate AI response.";

    return NextResponse.json(
      {
        error: "The architectural assistant encountered an issue. Please try again in a moment.",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}
