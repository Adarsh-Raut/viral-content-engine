import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export async function getPosts(req: Request, res: Response) {
  try {
    const { sort = "top", source, page = "1", limit = "20" } = req.query;

    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.min(Number(limit), 50); // cap at 50
    const skip = (pageNumber - 1) * limitNumber;

    const sortMap: Record<string, any> = {
      top: { upvotes: "desc" },
      trending: { score: "desc" },
    };

    const orderBy = sortMap[String(sort)] || sortMap["top"];

    const where = {
      source: source ? String(source) : undefined,
    };

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy,
        skip,
        take: limitNumber,
      }),
      prisma.post.count({ where }),
    ]);

    res.json({
      data: posts,
      meta: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}
