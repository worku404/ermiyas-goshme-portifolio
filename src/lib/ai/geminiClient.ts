import { buildSystemPrompt } from "./ownerContext";

/**
 * GEMINI API CLIENT WITH LOOP-BASED KEY ROTATION
 *
 * Implements user requirements:
 * - Uses DEFAULT_GEMINI_MODEL = "gemini-3.5-flash" directly.
 * - Rotates through API1_KEY through API8_KEY from .env in a loop.
 * - Single source of truth with no speculative logic.
 */
export const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash";

let activeKeyIndex = 0;

export function getAvailableApiKeys(): string[] {
  const keys: string[] = [];
  for (let i = 1; i <= 8; i++) {
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
 * Sends a message to Google Gemini using DEFAULT_GEMINI_MODEL = "gemini-3.5-flash"
 * with automatic loop rotation across API1_KEY..API8_KEY.
 */
export async function sendToGeminiWithKeyRotation(
  userMessage: string,
  history: ChatMessagePayload[] = []
): Promise<GeminiResponse> {
  const apiKeys = getAvailableApiKeys();

  if (apiKeys.length === 0) {
    throw new Error(
      "No Gemini API keys found. Please configure API1_KEY through API8_KEY in your .env file."
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
      maxOutputTokens: 900,
      topP: 0.95,
    },
  };

  const totalKeys = apiKeys.length;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < totalKeys; attempt++) {
    const keyIndex = (activeKeyIndex + attempt) % totalKeys;
    const currentApiKey = apiKeys[keyIndex];

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_GEMINI_MODEL}:generateContent?key=${currentApiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(12000),
      });

      if (response.ok) {
        const data = await response.json();
        const candidate = data.candidates?.[0];
        const text =
          candidate?.content?.parts?.[0]?.text ||
          "I am here to help you learn about Ermiyas Goshme's architectural portfolio. How can I assist you?";

        // Advance active key pointer
        activeKeyIndex = keyIndex;

        return {
          text,
          keyUsedIndex: keyIndex + 1,
        };
      }

      const errorText = await response.text();
      console.warn(
        `[Gemini Rotation] Key API${keyIndex + 1}_KEY failed with HTTP ${response.status}: ${errorText.slice(0, 140)}. Rotating to next key...`
      );
      lastError = new Error(`API${keyIndex + 1}_KEY HTTP ${response.status}: ${errorText.slice(0, 100)}`);
    } catch (err) {
      console.warn(
        `[Gemini Rotation] Network/timeout with API${keyIndex + 1}_KEY: ${err instanceof Error ? err.message : String(err)}. Rotating...`
      );
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }

  throw new Error(
    `All available Gemini API keys (${totalKeys} keys) exhausted. Last error: ${lastError?.message || "Unknown error"}`
  );
}
