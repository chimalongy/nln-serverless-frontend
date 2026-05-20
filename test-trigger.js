import "dotenv/config";
import { runs, configure } from '@trigger.dev/sdk/v3';

async function testTrigger() {
  const secretKey = process.env.TRIGGER_SECRET_KEY || process.env.TRIGGER_API_KEY;
  configure({ secretKey });

  console.log("Listing runs...");
  try {
    const activeStatuses = ['QUEUED', 'DEQUEUED', 'EXECUTING', 'WAITING', 'DELAYED', 'PENDING_VERSION'];
    for await (const run of runs.list({
      status: activeStatuses,
    })) {
      console.log(run.id, run.status);
    }
  } catch (e) {
    console.error("Error:", e.message);
  }
}

testTrigger();
