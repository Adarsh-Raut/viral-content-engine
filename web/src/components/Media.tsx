type Props = {
  url: string;
};

export default function Media({ url }: Props) {
  const isVideo =
    url.includes("v.redd.it") || url.endsWith(".mp4") || url.endsWith(".gif");

  if (isVideo) {
    return (
      <video
        src={url}
        controls
        muted
        loop
        playsInline
        className="w-full h-64 object-cover"
      />
    );
  }

  return (
    <img
      src={url}
      alt=""
      className="w-full h-64 object-cover"
      loading="lazy"
      onError={(e) => {
        (e.target as HTMLImageElement).src = "https://via.placeholder.com/300";
      }}
    />
  );
}
