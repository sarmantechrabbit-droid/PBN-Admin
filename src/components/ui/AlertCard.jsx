import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';

const typeConfig = {
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: AlertCircle,
    iconColor: 'text-red-500',
    titleColor: 'text-red-800',
    textColor: 'text-red-700',
    badge: 'bg-red-100 text-red-700',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: AlertTriangle,
    iconColor: 'text-amber-500',
    titleColor: 'text-amber-800',
    textColor: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-700',
  },
  info: {
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    icon: Info,
    iconColor: 'text-sky-500',
    titleColor: 'text-sky-800',
    textColor: 'text-sky-700',
    badge: 'bg-sky-100 text-sky-700',
  },
  success: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: CheckCircle,
    iconColor: 'text-emerald-500',
    titleColor: 'text-emerald-800',
    textColor: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700',
  },
};

export default function AlertCard({ title, description, type = 'info', severity, date, recommendation }) {
  const config = typeConfig[type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <motion.div
      className={`${config.bg} border ${config.border} rounded-2xl p-5 flex flex-col gap-3`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start gap-3">
        <Icon size={20} className={`${config.iconColor} mt-0.5 shrink-0`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className={`font-semibold text-sm ${config.titleColor}`}>{title}</h4>
            {severity && (
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.badge}`}>
                {severity} Risk
              </span>
            )}
            {date && <span className="text-xs text-slate-400 ml-auto">{date}</span>}
          </div>
          <p className={`text-sm mt-1 ${config.textColor}`}>{description}</p>
        </div>
      </div>
      {recommendation && (
        <div className="pl-8">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Recommendation</p>
          <p className="text-sm text-slate-600">{recommendation}</p>
        </div>
      )}
    </motion.div>
  );
}
