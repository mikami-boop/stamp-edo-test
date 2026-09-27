import { UserProgress } from '../types';

const STORAGE_KEY = 'edo_tokyo_rally_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  termsAccepted: false,
  collectedStamps: ['S002'], // Starting with S002 as shown in the mockup: "1 / 6 箇所獲得"
  completedAt: undefined,
  isRedeemed: false,
  redeemedAt: undefined,
  serialNumber: '#EDO-8921',
};

export function getStoredProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveStoredProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

export function resetStoredProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  return { ...DEFAULT_PROGRESS, collectedStamps: [] };
}
