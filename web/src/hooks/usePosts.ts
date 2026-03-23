import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";

export function usePosts(params: any) {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => fetchPosts(params),
  });
}
