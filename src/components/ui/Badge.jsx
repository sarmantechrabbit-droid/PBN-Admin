const variants = {
  success: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  error: 'bg-red-100 text-red-700 border border-red-200',
  warning: 'bg-amber-100 text-amber-700 border border-amber-200',
  info: 'bg-sky-100 text-sky-700 border border-sky-200',
  pending: 'bg-slate-100 text-slate-600 border border-slate-200',
  purple: 'bg-primary-light text-primary-text border border-primary/20',
};

const statusMap = {
  Approved: 'success',
  Failed: 'error',
  'Under Review': 'warning',
  Pending: 'pending',
  Completed: 'success',
  Cancelled: 'error',
  'In Progress': 'info',
  'In Transit': 'info',
  Delayed: 'warning',
  Delivered: 'success',
  Good: 'success',
  'Expiring Soon': 'warning',
  Damaged: 'error',
  Normal: 'success',
  Low: 'warning',
  Critical: 'error',
  High: 'error',
  Medium: 'warning',
};

export default function Badge({ label, variant }) {
  const resolvedVariant = variant || statusMap[label] || 'pending';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[resolvedVariant] || variants.pending}`}
    >
      {label}
    </span>
  );
}
