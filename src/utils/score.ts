export function calculateScore(upvotes: number, createdUtc: number) {
  const hours = (Date.now() / 1000 - createdUtc) / 3600;

  if (hours <= 0) return upvotes;

  return upvotes / hours;
}
