export default function FollowUpBadge({ status }) {
  const styles = {
    "too-early": "bg-yellow-100 text-yellow-700",
    "good-time": "bg-green-100 text-green-700",
    "overdue": "bg-red-100 text-red-700",
    "no-followup": "bg-gray-100 text-gray-500",
  };

  const labels = {
    "too-early": "Too early",
    "good-time": "Good time to follow up",
    "overdue": "Follow-up overdue",
    "no-followup": "No follow-up",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
