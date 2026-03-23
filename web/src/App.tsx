import { useState } from "react";
import { usePosts } from "./hooks/usePosts";
import PostCard from "./components/PostCard";

function App() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("top");

  const { data, isLoading } = usePosts({
    page,
    limit: 12,
    sort,
  });

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>No data</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔥 Viral Content</h1>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="top">Top</option>
        <option value="trending">Trending</option>
      </select>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {data?.data?.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}

export default App;
