import {
  fetchRedditPosts,
  filterMediaPosts,
  savePosts,
} from "../services/reddit.service";

async function run() {
  console.log("Fetching Reddit posts...");

  const posts = await fetchRedditPosts();
  const filtered = filterMediaPosts(posts);

  await savePosts(filtered);

  console.log(`Saved ${filtered.length} posts`);
}

run();
