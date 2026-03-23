import Media from "./Media";

export default function PostCard({ post }: any) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition">
      <Media url={post.mediaUrl} />

      <div className="p-2">
        <p className="text-sm font-medium line-clamp-2">{post.title}</p>
        <p className="text-xs text-gray-500 mt-1">👍 {post.upvotes}</p>
      </div>
    </div>
  );
}
