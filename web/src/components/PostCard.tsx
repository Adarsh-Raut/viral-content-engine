type Props = {
  post: any;
};

export default function PostCard({ post }: Props) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <img
        src={post.mediaUrl}
        alt={post.title}
        style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
      />
      <p>{post.title}</p>
      <p>👍 {post.upvotes}</p>
    </div>
  );
}
