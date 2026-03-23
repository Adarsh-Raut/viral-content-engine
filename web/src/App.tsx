import { useEffect, useRef, useState } from "react";
import { usePosts } from "./hooks/usePosts";
import PostCard from "./components/PostCard";

function App() {
  const [sort, setSort] = useState("top");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePosts(sort);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer (BEST approach)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">🔥 Viral Content</h1>

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="top">Top</option>
        <option value="trending">Trending</option>
      </select>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.pages.map((page) =>
          page.data.map((post: any) => <PostCard key={post.id} post={post} />),
        )}
      </div>

      {/* Loader */}
      <div ref={observerRef} className="h-10 flex justify-center items-center">
        {isFetchingNextPage && <p>Loading more...</p>}
        {!hasNextPage && <p>No more posts</p>}
      </div>
    </div>
  );
}

export default App;
