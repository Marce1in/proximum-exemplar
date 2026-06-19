"use client";

import { useState } from "react";
import { DefaultChatTransport } from "ai";
import { SendIcon, SquareIcon } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const transport = new DefaultChatTransport({
  api: "/api/ai/chat",
});

const chatStatusLabels: Record<string, string> = {
  error: "Erro",
  ready: "Pronto",
  streaming: "Respondendo",
  submitted: "Enviado",
};

export function ChatBox() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, stop, error } = useChat({
    transport,
  });
  const isBusy = status === "submitted" || status === "streaming";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = input.trim();
    if (!text || isBusy) return;

    setInput("");
    await sendMessage({ text });
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle>Assistente de IA</CardTitle>
        <Badge variant={isBusy ? "secondary" : "outline"}>
          {chatStatusLabels[status] ?? status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="bg-muted/30 max-h-80 space-y-3 overflow-y-auto rounded-md border p-3">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Peça um esboço de projeto, divisão de tarefas ou texto de produto.
            </p>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "rounded-md px-3 py-2 text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-background mr-auto",
                )}
              >
                {message.parts.map((part, index) =>
                  part.type === "text" ? (
                    <p
                      key={`${message.id}-${index}`}
                      className="whitespace-pre-wrap"
                    >
                      {part.text}
                    </p>
                  ) : null,
                )}
              </div>
            ))
          )}
        </div>
        {error ? (
          <p className="text-destructive text-sm">{error.message}</p>
        ) : null}
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Pergunte ao assistente..."
            className="min-h-12 resize-none"
          />
          {isBusy ? (
            <Button
              type="button"
              size="icon"
              variant="secondary"
              aria-label="Parar resposta"
              onClick={() => void stop()}
            >
              <SquareIcon />
            </Button>
          ) : (
            <Button type="submit" size="icon" aria-label="Enviar mensagem">
              <SendIcon />
            </Button>
          )}
        </form>
      </CardFooter>
    </Card>
  );
}
