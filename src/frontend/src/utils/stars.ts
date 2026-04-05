import { unlockBadge } from "./localProgress";

const STARS_KEY = "baby_game_stars";

export function getStars(): number {
  return Number.parseInt(localStorage.getItem(STARS_KEY) || "0", 10);
}

export function addStar(count = 1): number {
  const n = getStars() + count;
  localStorage.setItem(STARS_KEY, String(n));
  window.dispatchEvent(new Event("starsUpdated"));
  // Check badge milestones
  if (n >= 1) unlockBadge("first_star");
  if (n >= 50) unlockBadge("stars_50");
  if (n >= 100) unlockBadge("stars_100");
  return n;
}
