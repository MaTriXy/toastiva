function getBodyRevealProgress<T extends number>(progress: T) {
  "worklet";
  return Math.max(0, Math.min(1, (progress - 0.24) / 0.76));
}

function getContentRevealProgress<T extends number>(progress: T) {
  "worklet";
  return Math.max(0, Math.min(1, (progress - 0.46) / 0.54));
}

export { getBodyRevealProgress, getContentRevealProgress };
