import cron from "node-cron";
import {
  fetchRedditPosts,
  filterMediaPosts,
  savePosts,
} from "../services/reddit.service";

async function runJob() {
  console.log("⏳ Running Reddit job...");

  try {
    const posts = await fetchRedditPosts();
    const filtered = filterMediaPosts(posts);

    await savePosts(filtered);

    console.log(`✅ Saved ${filtered.length} posts`);
  } catch (err) {
    console.error("❌ Error in job:", err);
  }
}

// Run every 30 minutes
cron.schedule("*/30 * * * *", () => {
  runJob();
});

// Run immediately on start
runJob();
