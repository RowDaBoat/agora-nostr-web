function formatTimeAgo(timestamp) {
  const now = Date.now();
  const date = new Date(timestamp * 1e3);
  const diff = now - date.getTime();
  const seconds = Math.floor(diff / 1e3);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (seconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days < 7) {
    return `${days}d`;
  } else if (weeks < 4) {
    return `${weeks}w`;
  } else if (months < 12) {
    return `${months}mo`;
  } else {
    return `${years}y`;
  }
}

export { formatTimeAgo as f };
//# sourceMappingURL=formatTime-CvNAVcDX.js.map
