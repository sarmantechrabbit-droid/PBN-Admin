import { useState } from 'react';
import { Search, Lock } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import { auditLogs } from '../data/users';
import { experiments } from '../data/experiments';

export default function AuditViewer({ user }) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('logs');

  const filteredLogs = auditLogs.filter((log) => {
    const s = search.toLowerCase();
    return (
      log.id.toLowerCase().includes(s) ||
      log.experimentId.toLowerCase().includes(s) ||
      log.performedBy.toLowerCase().includes(s) ||
      log.action.toLowerCase().includes(s)
    );
  });

  const logColumns = [
    { key: 'id', label: 'Log ID' },
    { key: 'experimentId', label: 'Reference ID' },
    {
      key: 'action',
      label: 'Action',
      render: (v) => <span className="font-medium text-slate-800">{v}</span>,
    },
    { key: 'performedBy', label: 'Performed By' },
    {
      key: 'role',
      label: 'Role',
      render: (v) => (
        <span className="text-xs font-semibold text-primary-text bg-primary-light px-2 py-0.5 rounded-full">
          {v}
        </span>
      ),
    },
    { key: 'timestamp', label: 'Timestamp' },
    { key: 'version', label: 'Version' },
    {
      key: 'status',
      label: 'Status',
      render: (v) => <Badge label={v} />,
    },
    {
      key: 'remarks',
      label: 'Remarks',
      render: (v) => (
        <span className="text-xs text-slate-500 max-w-48 block truncate" title={v}>
          {v}
        </span>
      ),
    },
  ];

  const versionColumns = [
    { key: 'id', label: 'Experiment ID' },
    { key: 'name', label: 'Name', render: (v) => <span className="font-medium text-slate-800">{v}</span> },
    { key: 'recipeVersion', label: 'Version' },
    { key: 'chef', label: 'Chef' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: (v) => <Badge label={v} /> },
    {
      key: 'reviewerRemarks',
      label: 'Final Remarks',
      render: (v) => <span className="text-xs text-slate-500">{v}</span>,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Audit Viewer"
        subtitle="Read-only compliance records, experiment logs, and approval history"
        actions={
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-xs text-slate-500 font-semibold">
            <Lock size={13} />
            Read-Only Mode
          </div>
        }
      />

      {/* Auditor notice */}
      {user?.role === 'Auditor' && (
        <div className="mb-5 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 flex items-center gap-2">
          <Lock size={15} />
          You are viewing in <strong>read-only auditor mode</strong>. No edits are permitted.
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        {[
          { key: 'logs', label: 'Audit Logs' },
          { key: 'versions', label: 'Version History' },
          { key: 'approvals', label: 'Approval Records' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === tab.key
                ? 'bg-white shadow-sm text-slate-800'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search logs, references, or actions..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
        />
      </div>

      {activeTab === 'logs' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <p className="text-xs text-slate-400 mb-4">{filteredLogs.length} audit log(s)</p>
          <Table columns={logColumns} data={filteredLogs} emptyMessage="No logs match your search." />
        </div>
      )}

      {activeTab === 'versions' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <p className="text-xs text-slate-400 mb-4">{experiments.length} experiment version(s)</p>
          <Table columns={versionColumns} data={experiments} />
        </div>
      )}

      {activeTab === 'approvals' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <p className="text-xs text-slate-400 mb-4">
            {auditLogs.filter((l) => l.action.includes('Approved') || l.action.includes('Rejected')).length} approval record(s)
          </p>
          <Table
            columns={logColumns}
            data={auditLogs.filter(
              (l) =>
                l.action.includes('Approved') ||
                l.action.includes('Rejected') ||
                l.action.includes('Admin Reviewed')
            )}
          />
        </div>
      )}
    </div>
  );
}
