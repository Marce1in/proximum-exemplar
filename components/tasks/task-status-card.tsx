"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ActivityIcon,
  CheckCircle2Icon,
  Clock3Icon,
  XCircleIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/trpc/react";

type Task = {
  id: string;
  type: string;
  status: string;
  createdByUserId: string | null;
  payload: unknown;
  result: unknown;
  error: string | null;
  createdAt: Date;
  startedAt: Date | null;
  finishedAt: Date | null;
};

type TaskStatusCardProps = {
  initialTasks: Task[];
};

const statusLabels: Record<string, string> = {
  failed: "Falhou",
  pending: "Pendente",
  queued: "Na fila",
  running: "Em execução",
  succeeded: "Concluída",
};

function StatusIcon({ status }: { status: string }) {
  if (status === "succeeded") {
    return <CheckCircle2Icon className="size-4 text-emerald-600" />;
  }

  if (status === "failed") {
    return <XCircleIcon className="text-destructive size-4" />;
  }

  if (status === "running") {
    return <ActivityIcon className="size-4 text-sky-600" />;
  }

  return <Clock3Icon className="text-muted-foreground size-4" />;
}

export function TaskStatusCard({ initialTasks }: TaskStatusCardProps) {
  const trpc = useTRPC();
  const { data: tasks, isLoading } = useQuery(
    trpc.tasks.recent.queryOptions(undefined, {
      initialData: initialTasks,
      refetchInterval: 5_000,
    }),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tarefas em segundo plano</CardTitle>
        <CardDescription>
          Atualizadas via tRPC a cada cinco segundos.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Nenhuma tarefa na fila, em execução ou concluída ainda.
          </p>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between gap-3 rounded-md border p-3"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <StatusIcon status={task.status} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{task.type}</p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(task.createdAt).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">
                  {statusLabels[task.status] ?? task.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
