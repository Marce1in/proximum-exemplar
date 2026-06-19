type JobContext = {
  taskIndex: number;
  taskCount: number;
};

export async function warmCache(context: JobContext) {
  console.info(JSON.stringify({ event: "cache_warm_started", context }));
  console.info(JSON.stringify({ event: "cache_warm_finished", context }));
}
