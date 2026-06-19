import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { getDefaultModel } from "@/lib/ai/provider";
import { getCurrentClerkUserIdOrThrow } from "@/lib/auth";

export async function POST(req: Request) {
  await getCurrentClerkUserIdOrThrow();

  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: getDefaultModel(),
    system: "You are a concise product assistant inside Proximum Exemplar.",
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
