export default function FormInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required,
  disabled,
  options,
  rows,
}) {
  const baseClass =
    'w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition disabled:bg-slate-50 disabled:text-slate-400';

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}

      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={baseClass}
        >
          <option value="">Select...</option>
          {options?.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows || 3}
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={baseClass}
        />
      )}
    </div>
  );
}
