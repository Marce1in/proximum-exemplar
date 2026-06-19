import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ActivityIcon,
  BotIcon,
  CheckCircle2Icon,
  CloudIcon,
  DatabaseIcon,
  FolderKanbanIcon,
  HardDriveUploadIcon,
  RefreshCwIcon,
  ServerCogIcon,
  ShieldCheckIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { count } from "drizzle-orm";
import { LoginButton } from "@/components/auth/login-button";
import { UserMenu } from "@/components/auth/user-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { users } from "@/db/schema";
import { checkOpenRouterAccess } from "@/lib/ai/provider";
import { getCurrentClerkAuth } from "@/lib/auth";
import { env } from "@/lib/env";
import { db } from "@/lib/runtime/db";
import { redis } from "@/lib/runtime/redis";
import { checkObjectStoreAccess } from "@/lib/runtime/storage";
import { getCurrentInternalUserOrThrow } from "@/lib/services/users";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type CheckState = "ok" | "warn" | "error";

type ServiceCheck = {
  id: string;
  label: string;
  provider: string;
  icon: LucideIcon;
  state: CheckState;
  detail: string;
  meta: string;
  latencyMs: number;
};

type CheckResult = Pick<ServiceCheck, "state" | "detail" | "meta">;

const stateLabels: Record<CheckState, string> = {
  ok: "OK",
  warn: "Configurar",
  error: "Falhou",
};

const stateStyles: Record<CheckState, string> = {
  ok: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300",
  warn: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300",
  error:
    "border-destructive/25 bg-destructive/10 text-destructive dark:border-destructive/50",
};

const dotStyles: Record<CheckState, string> = {
  ok: "bg-emerald-500",
  warn: "bg-amber-500",
  error: "bg-destructive",
};

async function runServiceCheck(
  input: Pick<ServiceCheck, "id" | "label" | "provider" | "icon">,
  check: () => Promise<CheckResult>,
): Promise<ServiceCheck> {
  const startedAt = performance.now();

  try {
    const result = await check();

    return {
      ...input,
      ...result,
      latencyMs: Math.max(1, Math.round(performance.now() - startedAt)),
    };
  } catch (error) {
    console.error(`Homepage service check failed: ${input.id}`, error);

    return {
      ...input,
      state: "error",
      detail: "A verificação do serviço falhou. Veja os logs da função Vercel.",
      meta: error instanceof Error ? error.name : "Erro desconhecido",
      latencyMs: Math.max(1, Math.round(performance.now() - startedAt)),
    };
  }
}

async function getServiceChecks() {
  return Promise.all([
    runServiceCheck(
      {
        id: "clerk",
        label: "Clerk",
        provider: "Autenticação",
        icon: ShieldCheckIcon,
      },
      async () => {
        const auth = await getCurrentClerkAuth();

        if (!auth.userId) {
          return {
            state: "ok",
            detail: "Clerk está configurado e este visitante está sem sessão.",
            meta: "Sessão pública",
          };
        }

        const internalUser = await getCurrentInternalUserOrThrow();

        return {
          state: "ok",
          detail:
            "Usuário autenticado no Clerk está mapeado para uma linha interna em users.",
          meta: `users.id ${internalUser.id.slice(0, 8)}`,
        };
      },
    ),
    runServiceCheck(
      {
        id: "neon",
        label: "Neon Postgres",
        provider: "Drizzle",
        icon: DatabaseIcon,
      },
      async () => {
        const [row] = await db.select({ value: count() }).from(users);
        const userCount = row?.value ?? 0;

        return {
          state: "ok",
          detail: "Conectado via Drizzle e consulta na tabela users concluída.",
          meta: `${userCount} usuário${userCount === 1 ? "" : "s"} mapeado${userCount === 1 ? "" : "s"}`,
        };
      },
    ),
    runServiceCheck(
      {
        id: "upstash",
        label: "Upstash Redis",
        provider: "Cache",
        icon: ActivityIcon,
      },
      async () => {
        const key = "health:homepage:last-check";
        const checkedAt = new Date().toISOString();

        await redis.set(key, checkedAt, "EX", 60);
        const [pong, ttl] = await Promise.all([redis.ping(), redis.ttl(key)]);

        return {
          state: pong === "PONG" ? "ok" : "warn",
          detail: "PING e escrita temporária no cache concluídos.",
          meta: `TTL ${ttl}s`,
        };
      },
    ),
    runServiceCheck(
      {
        id: "blob",
        label: "Vercel Blob",
        provider: "Armazenamento de objetos",
        icon: HardDriveUploadIcon,
      },
      async () => {
        const result = await checkObjectStoreAccess();

        return {
          state: "ok",
          detail: "Token de leitura e escrita consegue listar o Blob privado.",
          meta: `${result.objectCount} objeto${result.objectCount === 1 ? "" : "s"} de saúde`,
        };
      },
    ),
    runServiceCheck(
      {
        id: "cron",
        label: "Vercel Cron",
        provider: "Agendador",
        icon: ServerCogIcon,
      },
      async () => ({
        state: env.CRON_SECRET.length >= 16 ? "ok" : "warn",
        detail: "A rota de cron tem um segredo bearer configurado.",
        meta: "Agenda diária",
      }),
    ),
    runServiceCheck(
      {
        id: "ai",
        label: "AI SDK",
        provider: env.AI_PROVIDER === "openrouter" ? "OpenRouter" : "Gemini",
        icon: BotIcon,
      },
      async () => {
        if (env.AI_PROVIDER === "openrouter") {
          const result = await checkOpenRouterAccess();

          return {
            state: result.selectedModel ? "ok" : "warn",
            detail: result.selectedModel
              ? "Autenticado no OpenRouter e modelo selecionado carregado do catálogo."
              : "OpenRouter está acessível, mas o modelo selecionado não foi encontrado.",
            meta: `${env.OPENROUTER_DEFAULT_MODEL} · ${result.modelCount} modelos`,
          };
        }

        return {
          state: env.GOOGLE_GENERATIVE_AI_API_KEY ? "ok" : "warn",
          detail: env.GOOGLE_GENERATIVE_AI_API_KEY
            ? "O provedor direto de IA selecionado tem uma chave de servidor."
            : "O provedor direto de IA selecionado aguarda uma chave real.",
          meta: env.AI_DEFAULT_MODEL,
        };
      },
    ),
  ]);
}

function ServiceStatusCard({ check }: { check: ServiceCheck }) {
  const Icon = check.icon;

  return (
    <Card className="rounded-md py-0 shadow-none">
      <CardHeader className="gap-3 border-b px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-md border">
              <Icon className="text-muted-foreground size-4" />
            </div>
            <div className="min-w-0">
              <CardTitle className="truncate text-sm">{check.label}</CardTitle>
              <CardDescription className="truncate">
                {check.provider}
              </CardDescription>
            </div>
          </div>
          <Badge
            variant="outline"
            className={cn("shrink-0 gap-1.5", stateStyles[check.state])}
          >
            <span
              aria-hidden="true"
              className={cn("size-1.5 rounded-full", dotStyles[check.state])}
            />
            {stateLabels[check.state]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-4 py-4">
        <p className="text-sm leading-6">{check.detail}</p>
        <div className="text-muted-foreground flex items-center justify-between gap-3 text-xs">
          <span className="truncate font-mono">{check.meta}</span>
          <span className="shrink-0 font-mono">{check.latencyMs}ms</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function Home() {
  const [checks, auth] = await Promise.all([
    getServiceChecks(),
    getCurrentClerkAuth(),
  ]);
  const okCount = checks.filter((check) => check.state === "ok").length;
  const warningCount = checks.filter((check) => check.state === "warn").length;
  const errorCount = checks.filter((check) => check.state === "error").length;

  return (
    <main className="bg-background min-h-screen">
      <section className="border-b bg-[linear-gradient(135deg,var(--muted)_0,transparent_42%),repeating-linear-gradient(90deg,transparent_0,transparent_34px,var(--border)_35px)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
          <div className="flex flex-col justify-center gap-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Console de serviços ao vivo</Badge>
              <Badge variant="outline">Vercel Marketplace</Badge>
              <Badge variant="outline">App Router do Next.js</Badge>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-normal sm:text-5xl">
                Proximum Exemplar
              </h1>
              <p className="text-muted-foreground max-w-2xl text-lg leading-8">
                A página inicial executa verificações reais no servidor contra
                autenticação, banco de dados, Redis, armazenamento de objetos,
                cron e configuração de IA.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  <FolderKanbanIcon />
                  Abrir painel
                </Link>
              </Button>
              {auth.userId ? (
                <div className="flex items-center gap-3">
                  <UserMenu />
                  <span className="text-muted-foreground text-sm">
                    Sessão do Clerk ativa
                  </span>
                </div>
              ) : (
                <LoginButton />
              )}
            </div>
          </div>

          <div className="bg-background/90 grid content-start gap-3 rounded-md border p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Deploy atual</p>
                <p className="text-muted-foreground text-xs">
                  {process.env.VERCEL_ENV ?? env.NODE_ENV}
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/">
                  <RefreshCwIcon />
                  Atualizar
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-md border p-3">
                <CheckCircle2Icon className="mb-2 size-4 text-emerald-600" />
                <p className="text-2xl font-semibold">{okCount}</p>
                <p className="text-muted-foreground text-xs">OK</p>
              </div>
              <div className="rounded-md border p-3">
                <TriangleAlertIcon className="mb-2 size-4 text-amber-600" />
                <p className="text-2xl font-semibold">{warningCount}</p>
                <p className="text-muted-foreground text-xs">Configurar</p>
              </div>
              <div className="rounded-md border p-3">
                <CloudIcon className="text-destructive mb-2 size-4" />
                <p className="text-2xl font-semibold">{errorCount}</p>
                <p className="text-muted-foreground text-xs">Falhas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {checks.map((check) => (
          <ServiceStatusCard key={check.id} check={check} />
        ))}
      </section>
    </main>
  );
}
