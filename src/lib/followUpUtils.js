export function getDaysSince(date) {
  const appliedDate = new Date(date);
  const today = new Date();
  return Math.floor(
    (today - appliedDate) / (1000 * 60 * 60 * 24)
  );
}

export function getFollowUpStatus(days, status) {
  if (status === "Rejected") return "no-followup";
  if (days < 3) return "too-early";
  if (days <= 7) return "good-time";
  return "overdue";
}
