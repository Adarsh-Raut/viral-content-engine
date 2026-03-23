import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";

export function usePosts(sort: string) {
  return useInfiniteQuery({
    queryKey: ["posts", sort],

    queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam, sort }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;

      if (page < totalPages) {
        return page + 1;
      }

      return undefined;
    },
  });
}
