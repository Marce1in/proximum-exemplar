import "server-only";

import { google } from "@ai-sdk/google";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { LanguageModel } from "ai";
import { env } from "@/lib/env";

export function getDefaultModel(): LanguageModel {
  if (env.AI_PROVIDER === "openrouter") {
    if (!env.OPENROUTER_API_KEY) {
      throw new Error(
        "OPENROUTER_API_KEY is required when AI_PROVIDER=openrouter",
      );
    }

    const openrouter = createOpenRouter({
      apiKey: env.OPENROUTER_API_KEY,
    });

    return openrouter.chat(env.OPENROUTER_DEFAULT_MODEL);
  }

  if (!env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error(
      "GOOGLE_GENERATIVE_AI_API_KEY is required when AI_PROVIDER=gemini",
    );
  }

  return google(env.AI_DEFAULT_MODEL);
}

type OpenRouterModel = {
  id: string;
  name?: string;
  context_length?: number;
};

type OpenRouterModelsResponse = {
  data: OpenRouterModel[];
};

export async function checkOpenRouterAccess() {
  if (!env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is required for OpenRouter checks");
  }

  const response = await fetch("https://openrouter.ai/api/v1/models", {
    headers: {
      Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
    },
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error(`OpenRouter model catalog returned ${response.status}`);
  }

  const result = (await response.json()) as OpenRouterModelsResponse;
  const selectedModel = result.data.find(
    (model) => model.id === env.OPENROUTER_DEFAULT_MODEL,
  );

  return {
    modelCount: result.data.length,
    selectedModel,
  };
}
