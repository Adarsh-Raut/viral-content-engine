import axios from "axios";
import { prisma } from "../utils/prisma";
import { calculateScore } from "../utils/score";

const SUBREDDITS = ["memes", "funny", "dankmemes"];

export async function fetchRedditPosts() {
  const results = [];

  for (const subreddit of SUBREDDITS) {
    const url = `https://www.reddit.com/r/${subreddit}/top.json?t=day&limit=25`;

    const res = await axios.get(url, {
      headers: {
        "User-Agent": "viral-content-engine",
      },
    });

    results.push(...res.data.data.children);
  }

  return results;
}

export function filterMediaPosts(posts: any[]) {
  return posts.filter((p) => {
    const data = p.data;

    const hasImage =
      data.post_hint === "image" ||
      data.url?.endsWith(".jpg") ||
      data.url?.endsWith(".png");

    const hasVideo = data.is_video;

    return hasImage || hasVideo;
  });
}

export async function savePosts(posts: any[]) {
  for (const p of posts) {
    const data = p.data;

    try {
      await prisma.post.create({
        data: {
          source: "reddit",
          externalId: data.id,
          title: data.title,
          mediaUrl: data.is_video
            ? data.media?.reddit_video?.fallback_url
            : data.url,
          postUrl: `https://reddit.com${data.permalink}`,
          upvotes: data.ups,
          comments: data.num_comments,
          score: calculateScore(data.ups, data.created_utc),
          createdAt: new Date(data.created_utc * 1000),
        },
      });
    } catch (err) {
      // ignore duplicates
    }
  }
}
