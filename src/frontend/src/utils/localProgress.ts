// Local progress storage for avatar, streak, and badges
// Stars are stored by utils/stars.ts for backward compatibility

const KEYS = {
  streak: "baby_streak",
  lastDay: "baby_last_day",
  maxStreak: "baby_max_streak",
  badges: "baby_badges",
  avatar: "baby_avatar",
};

export function getStars(): number {
  return Number.parseInt(localStorage.getItem("baby_game_stars") || "0", 10);
}

export function getStreak(): { current: number; max: number } {
  return {
    current: Number(localStorage.getItem(KEYS.streak) ?? 0),
    max: Number(localStorage.getItem(KEYS.maxStreak) ?? 0),
  };
}

export function updateStreak(): number {
  const today = new Date().toISOString().split("T")[0];
  const lastDay = localStorage.getItem(KEYS.lastDay) ?? "";
  if (lastDay === today) return getStreak().current;

  const newStreak = getStreak().current + 1;
  const newMax = Math.max(newStreak, getStreak().max);
  localStorage.setItem(KEYS.streak, String(newStreak));
  localStorage.setItem(KEYS.maxStreak, String(newMax));
  localStorage.setItem(KEYS.lastDay, today);

  if (newStreak >= 3) unlockBadge("streak_3");
  if (newStreak >= 7) unlockBadge("streak_7");
  return newStreak;
}

export function getBadges(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEYS.badges) ?? "[]");
  } catch {
    return [];
  }
}

export function unlockBadge(badge: string): void {
  const badges = getBadges();
  if (!badges.includes(badge)) {
    badges.push(badge);
    localStorage.setItem(KEYS.badges, JSON.stringify(badges));
  }
}

export function getAvatar(): string {
  return localStorage.getItem(KEYS.avatar) ?? "🐶";
}

export function setAvatar(avatar: string): void {
  localStorage.setItem(KEYS.avatar, avatar);
}
