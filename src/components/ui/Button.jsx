const variants = {
  primary: 'bg-primary hover:bg-primary-dark text-white shadow-sm',
  secondary: 'bg-secondary hover:bg-secondary-dark text-white shadow-sm',
  outline: 'border border-slate-200 hover:bg-slate-50 text-slate-700',
  danger: 'bg-error hover:bg-error-text text-white shadow-sm',
  ghost: 'hover:bg-slate-100 text-slate-600',
  success: 'bg-success hover:bg-success-text text-white shadow-sm',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-sm',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled,
  icon: Icon,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon size={14} />}
      {children}
    </button>
  );
}
