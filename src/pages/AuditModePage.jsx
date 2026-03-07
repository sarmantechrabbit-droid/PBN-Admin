import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Badge from '../components/ui/Badge';
import { mockSystemSettings } from '../data/corporateAdmin';

export default function AuditModePage() {
  const [auditMode, setAuditMode] = useState(mockSystemSettings.CRA_AUDIT_MODE);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleAuditMode = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAuditMode(!auditMode);
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="CRA Audit Mode"
        subtitle="Control system-wide audit compliance settings"
      />

      {/* Status Card */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              auditMode ? 'bg-emerald-100' : 'bg-slate-100'
            }`}>
              <Shield size={32} className={auditMode ? 'text-emerald-600' : 'text-slate-400'} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-1">
                CRA Audit Mode
              </h2>
              <div className="flex items-center gap-2">
                <Badge 
                  label={auditMode ? 'Enabled' : 'Disabled'} 
                  variant={auditMode ? 'success' : 'error'} 
                />
                <span className="text-sm text-slate-500">
                  Last updated: {mockSystemSettings.lastUpdated}
                </span>
              </div>
            </div>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600">
              {auditMode ? 'Enabled' : 'Disabled'}
            </span>
            <button
              onClick={handleToggleAuditMode}
              disabled={isLoading}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                auditMode ? 'bg-emerald-500' : 'bg-slate-300'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  auditMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Status Description */}
        <div className={`p-4 rounded-xl border-l-4 ${
          auditMode 
            ? 'bg-emerald-50 border-emerald-400' 
            : 'bg-slate-50 border-slate-400'
        }`}>
          <div className="flex items-start gap-3">
            {auditMode ? (
              <CheckCircle size={20} className="text-emerald-600 mt-0.5" />
            ) : (
              <AlertTriangle size={20} className="text-slate-500 mt-0.5" />
            )}
            <div>
              <h3 className={`font-semibold mb-1 ${
                auditMode ? 'text-emerald-800' : 'text-slate-700'
              }`}>
                {auditMode ? 'Audit Mode is Active' : 'Audit Mode is Inactive'}
              </h3>
              <p className={`text-sm ${
                auditMode ? 'text-emerald-700' : 'text-slate-600'
              }`}>
                {auditMode 
                  ? 'All experiment logs are now immutable and detailed audit trails are being recorded.'
                  : 'Standard mode is active. Experiment logs can be modified by authorized users.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Info size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">When Enabled</h3>
              <p className="text-sm text-slate-600">CRA Audit Mode activates the following features:</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
              All experiment logs become immutable
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
              Detailed audit trail recording
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
              No record editing allowed
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
              Enhanced compliance monitoring
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <AlertTriangle size={20} className="text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Important Notice</h3>
              <p className="text-sm text-slate-600">Please consider the following before enabling:</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
              Changes cannot be undone once enabled
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
              May impact system performance
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
              Requires additional storage space
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
              Staff training may be required
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}