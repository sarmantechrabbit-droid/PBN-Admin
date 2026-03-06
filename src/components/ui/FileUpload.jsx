import { useState } from 'react';
import { Upload, X, FileText, Image } from 'lucide-react';

export default function FileUpload({ label, accept = '*', name, disabled }) {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  const isImage = file?.type?.startsWith('image/');

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
          {label}
        </label>
      )}
      {!file ? (
        <label
          className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer hover:border-primary hover:bg-primary-light transition ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Upload size={22} className="text-slate-400" />
          <span className="text-sm text-slate-500">Click to upload or drag & drop</span>
          <span className="text-xs text-slate-400">Accepted: {accept}</span>
          <input
            type="file"
            name={name}
            accept={accept}
            onChange={handleChange}
            disabled={disabled}
            className="hidden"
          />
        </label>
      ) : (
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
          {isImage ? (
            <Image size={18} className="text-primary shrink-0" />
          ) : (
            <FileText size={18} className="text-sky-500 shrink-0" />
          )}
          <span className="text-sm text-slate-700 truncate flex-1">{file.name}</span>
          <span className="text-xs text-slate-400">
            {(file.size / 1024).toFixed(1)} KB
          </span>
          <button
            type="button"
            onClick={() => setFile(null)}
            className="text-slate-400 hover:text-red-400 transition"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
