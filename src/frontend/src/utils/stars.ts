const STARS_KEY = "baby_game_stars";

export function getStars(): number {
  return Number.parseInt(localStorage.getItem(STARS_KEY) || "0", 10);
}

export function addStar(count = 1): number {
  const n = getStars() + count;
  localStorage.setItem(STARS_KEY, String(n));
  window.dispatchEvent(new Event("starsUpdated"));
  return n;
}
