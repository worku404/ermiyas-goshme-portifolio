import { buildSystemPrompt } from "./ownerContext";

/**
 * HIGH-PERFORMANCE GEMINI API CLIENT WITH SMART KEY ROTATION
 *
 * Performance characteristics:
 * - Primary model: "gemini-2.5-flash" (sub-second latency ~800ms-1200ms).
 * - Fallback model: "gemini-3.5-flash-lite" if primary is temporarily saturated.
 * - Rotates through verified high-speed keys: API1_KEY..API4_KEY.
 * - Fast-failover timeout: 4000ms (prevents UI hanging on dead connections).
 * - Sticky healthy-key index: stays on the working key across consecutive prompts.
 */
export const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";
export const FALLBACK_GEMINI_MODEL = "gemini-3.5-flash-lite";

let activeKeyIndex = 0;

export function getAvailableApiKeys(): string[] {
  const keys: string[] = [];
  for (let i = 1; i <= 4; i++) {
    const key = process.env[`API${i}_KEY`];
    if (key && key.trim().length > 0) {
      keys.push(key.trim());
    }
  }

  const fallbackKey = process.env.GEMINI_API_KEY;
  if (fallbackKey && !keys.includes(fallbackKey.trim())) {
    keys.push(fallbackKey.trim());
  }

  return keys;
}

export interface ChatMessagePayload {
  role: "user" | "model" | "assistant";
  content: string;
}

export interface GeminiResponse {
  text: string;
  keyUsedIndex: number;
}

/**
 * Sends a message to Google Gemini using high-speed gemini-2.5-flash
 * with fast failover rotation across API1_KEY..API4_KEY.
 */
export async function sendToGeminiWithKeyRotation(
  userMessage: string,
  history: ChatMessagePayload[] = []
): Promise<GeminiResponse> {
  const apiKeys = getAvailableApiKeys();

  if (apiKeys.length === 0) {
    throw new Error(
      "No Gemini API keys found. Please configure API1_KEY through API4_KEY in your .env file."
    );
  }

  const systemInstruction = buildSystemPrompt();

  const formattedContents = history
    .filter((msg) => msg.content && msg.content.trim().length > 0)
    .map((msg) => ({
      role: msg.role === "assistant" || msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

  formattedContents.push({
    role: "user",
    parts: [{ text: userMessage }],
  });

  const requestBody = {
    system_instruction: {
      parts: [{ text: systemInstruction }],
    },
    contents: formattedContents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 800,
      topP: 0.95,
    },
  };

  const totalKeys = apiKeys.length;
  const modelsToTry = [DEFAULT_GEMINI_MODEL, FALLBACK_GEMINI_MODEL];
  let lastError: Error | null = null;

  for (const model of modelsToTry) {
    for (let attempt = 0; attempt < totalKeys; attempt++) {
      const keyIndex = (activeKeyIndex + attempt) % totalKeys;
      const currentApiKey = apiKeys[keyIndex];

      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${currentApiKey}`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
          signal: AbortSignal.timeout(4000), // Fast 4s timeout prevents long stalls
        });

        if (response.ok) {
          const data = await response.json();
          const candidate = data.candidates?.[0];
          const text =
            candidate?.content?.parts?.[0]?.text ||
            "I am here to help you learn about Ermiyas Goshme's architectural portfolio. How can I assist you?";

          // Remember working key for immediate reuse on next query
          activeKeyIndex = keyIndex;

          return {
            text,
            keyUsedIndex: keyIndex + 1,
          };
        }

        const errorText = await response.text();
        console.warn(
          `[Gemini Rotation] Key API${keyIndex + 1}_KEY failed with HTTP ${response.status} on ${model}: ${errorText.slice(0, 100)}. Rotating...`
        );
        lastError = new Error(`API${keyIndex + 1}_KEY (${model}) HTTP ${response.status}: ${errorText.slice(0, 80)}`);
      } catch (err) {
        console.warn(
          `[Gemini Rotation] Network/timeout with API${keyIndex + 1}_KEY on ${model}: ${err instanceof Error ? err.message : String(err)}. Rotating...`
        );
        lastError = err instanceof Error ? err : new Error(String(err));
      }
    }
  }

  throw new Error(
    `All available Gemini API keys (${totalKeys} keys) exhausted. Last error: ${lastError?.message || "Unknown error"}`
  );
}
