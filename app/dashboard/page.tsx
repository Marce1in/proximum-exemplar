import Link from "next/link";
import {
  ArrowUpRightIcon,
  DatabaseIcon,
  FolderKanbanIcon,
  ServerCogIcon,
  Trash2Icon,
} from "lucide-react";
import { ChatBox } from "@/components/ai/chat-box";
import { UserMenu } from "@/components/auth/user-menu";
import { ProjectCreateForm } from "@/components/dashboard/project-create-form";
import { TaskStatusCard } from "@/components/tasks/task-status-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listProjectsForUser } from "@/lib/services/projects";
import { listRecentTasksForUser } from "@/lib/services/tasks";
import { getCurrentInternalUserOrThrow } from "@/lib/services/users";
import { createProjectAction, deleteProjectAction } from "./actions";

export default async function DashboardPage() {
  const user = await getCurrentInternalUserOrThrow();
  const [projects, tasks] = await Promise.all([
    listProjectsForUser(user.id),
    listRecentTasksForUser(user.id),
  ]);

  return (
    <main className="bg-muted/30 min-h-screen">
      <header className="bg-background border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <ServerCogIcon className="size-5" />
            Proximum Exemplar
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">Next.js 16 template</Badge>
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
        <section className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Projects</CardDescription>
                <CardTitle className="text-3xl">{projects.length}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground flex items-center gap-2 text-sm">
                <FolderKanbanIcon className="size-4" />
                Drizzle-owned records
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Tasks</CardDescription>
                <CardTitle className="text-3xl">{tasks.length}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground flex items-center gap-2 text-sm">
                <ServerCogIcon className="size-4" />
                Postgres-backed queue
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Runtime</CardDescription>
                <CardTitle className="text-3xl">4</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground flex items-center gap-2 text-sm">
                <DatabaseIcon className="size-4" />
                Neon, Upstash, Blob, AI
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                Server-rendered reads with Server Action mutations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <div className="text-muted-foreground rounded-md border border-dashed p-6 text-sm">
                  Create a project to verify Clerk ownership, Drizzle writes,
                  and dashboard revalidation.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="w-12" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">
                          {project.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground max-w-md truncate">
                          {project.description || "No description"}
                        </TableCell>
                        <TableCell>
                          {project.createdAt.toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <form action={deleteProjectAction}>
                            <input
                              type="hidden"
                              name="projectId"
                              value={project.id}
                            />
                            <Button
                              type="submit"
                              size="icon"
                              variant="ghost"
                              aria-label={`Delete ${project.name}`}
                            >
                              <Trash2Icon />
                            </Button>
                          </form>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            <TaskStatusCard initialTasks={tasks} />
            <ChatBox />
          </div>
        </section>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>
                Uses the internal user ID, never the Clerk ID, for ownership.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectCreateForm action={createProjectAction} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Runtime endpoints</CardTitle>
              <CardDescription>Typed APIs and route handlers.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm">
              {[
                "/api/trpc",
                "/api/uploads/presign",
                "/api/uploads/complete",
                "/api/tasks/artifact-processing",
                "/api/cron/background-tasks",
                "/api/ai/chat",
              ].map((path) => (
                <div
                  key={path}
                  className="flex items-center justify-between gap-3 rounded-md border px-3 py-2"
                >
                  <code className="truncate">{path}</code>
                  <ArrowUpRightIcon className="text-muted-foreground size-4" />
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
