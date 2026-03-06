import { motion } from 'framer-motion';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'purple', trend }) {
  const colors = {
    purple: { bg: 'bg-primary-light', icon: 'bg-primary', text: 'text-primary-text' },
    sky:    { bg: 'bg-secondary-light', icon: 'bg-secondary', text: 'text-secondary-text' },
    amber:  { bg: 'bg-accent-light', icon: 'bg-accent', text: 'text-accent-text' },
    emerald:{ bg: 'bg-success-light', icon: 'bg-success', text: 'text-success-text' },
    red:    { bg: 'bg-error-light', icon: 'bg-error', text: 'text-error-text' },
    slate:  { bg: 'bg-slate-50', icon: 'bg-slate-600', text: 'text-slate-700' },
  };

  const c = colors[color] || colors.purple;

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        {Icon && (
          <div className={`${c.icon} p-2 rounded-xl`}>
            <Icon size={18} className="text-white" />
          </div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-slate-800">{value}</span>
        {trend && (
          <span
            className={`text-xs font-semibold mb-1 ${
              trend > 0 ? 'text-emerald-600' : 'text-red-500'
            }`}
          >
            {trend > 0 ? `+${trend}%` : `${trend}%`}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
    </motion.div>
  );
}
