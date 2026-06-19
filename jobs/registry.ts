import { runAiBatch } from "./tasks/ai-batch";
import { generateReports } from "./tasks/generate-report";
import { processArtifacts } from "./tasks/process-artifacts";
import { warmCache } from "./tasks/warm-cache";

export type JobContext = {
  taskIndex: number;
  taskCount: number;
};

export type JobHandler = (context: JobContext) => Promise<void>;

export const jobs = {
  "artifacts:process": processArtifacts,
  "ai:batch": runAiBatch,
  "cache:warm": warmCache,
  "reports:generate": generateReports,
} satisfies Record<string, JobHandler>;
