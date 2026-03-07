import { useState } from 'react';
import { Search, Lock, Clock, FileText, CheckCircle, XCircle } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import { auditLogs } from '../data/users';
import { experiments } from '../data/experiments';

export default function AuditViewer({ user }) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('experiments');

  const timelineEvents = [
    {
      id: 1,
      event: 'Experiment Created',
      experimentId: 'EXP-001',
      timestamp: '2025-12-10 09:30',
      user: 'Chef Rahman',
      status: 'completed'
    },
    {
      id: 2,
      event: 'Experiment Submitted',
      experimentId: 'EXP-001',
      timestamp: '2025-12-10 14:15',
      user: 'Chef Rahman',
      status: 'completed'
    },
    {
      id: 3,
      event: 'Reviewer Decision',
      experimentId: 'EXP-001',
      timestamp: '2025-12-11 10:20',
      user: 'Manager Ali',
      status: 'completed'
    },
    {
      id: 4,
      event: 'Approval',
      experimentId: 'EXP-001',
      timestamp: '2025-12-11 10:25',
      user: 'Manager Ali',
      status: 'approved'
    }
  ];

  const versionHistory = [
    {
      version: 'v1.0',
      modifiedBy: 'Chef Rahman',
      changeDescription: 'Initial recipe creation',
      date: '2025-12-10'
    },
    {
      version: 'v1.1',
      modifiedBy: 'Chef Rahman',
      changeDescription: 'Updated spice quantities',
      date: '2025-12-10'
    },
    {
      version: 'v1.2',
      modifiedBy: 'Manager Ali',
      changeDescription: 'Approved for production',
      date: '2025-12-11'
    }
  ];

  const approvalRecords = [
    {
      reviewer: 'Manager Ali',
      decision: 'Approved',
      remarks: 'Excellent flavor profile, ready for production',
      date: '2025-12-11'
    },
    {
      reviewer: 'Manager Sara',
      decision: 'Rejected',
      remarks: 'Needs adjustment in salt content',
      date: '2025-12-09'
    },
    {
      reviewer: 'Manager Ali',
      decision: 'Approved',
      remarks: 'Good texture and taste balance',
      date: '2025-12-08'
    }
  ];

  const filteredLogs = auditLogs.filter((log) => {
    const s = search.toLowerCase();
    return (
      log.id.toLowerCase().includes(s) ||
      log.experimentId.toLowerCase().includes(s) ||
      log.performedBy.toLowerCase().includes(s) ||
      log.action.toLowerCase().includes(s)
    );
  });

  const experimentColumns = [
    { key: 'id', label: 'Experiment ID' },
    { key: 'name', label: 'Recipe Version', render: (v) => <span className="font-medium text-slate-800">{v}</span> },
    { key: 'date', label: 'Created Date' },
    { key: 'chef', label: 'Chef Name' },
    { key: 'status', label: 'Status', render: (v) => <Badge label={v} /> },
  ];

  const timelineColumns = [
    { 
      key: 'event', 
      label: 'Event',
      render: (v, row) => (
        <div className="flex items-center gap-2">
          {row.status === 'approved' ? (
            <CheckCircle size={16} className="text-emerald-500" />
          ) : row.status === 'rejected' ? (
            <XCircle size={16} className="text-red-500" />
          ) : (
            <Clock size={16} className="text-slate-400" />
          )}
          <span className="font-medium text-slate-800">{v}</span>
        </div>
      )
    },
    { key: 'experimentId', label: 'Experiment ID' },
    { key: 'timestamp', label: 'Timestamp' },
    { key: 'user', label: 'User' },
  ];

  const versionColumns = [
    { key: 'version', label: 'Version' },
    { key: 'modifiedBy', label: 'Modified By' },
    { key: 'changeDescription', label: 'Change Description' },
    { key: 'date', label: 'Date' },
  ];

  const approvalColumns = [
    { key: 'reviewer', label: 'Reviewer' },
    { 
      key: 'decision', 
      label: 'Decision',
      render: (v) => (
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
          v === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
        }`}>
          {v === 'Approved' ? <CheckCircle size={12} /> : <XCircle size={12} />}
          {v}
        </span>
      )
    },
    { key: 'remarks', label: 'Remarks', render: (v) => <span className="text-xs text-slate-500">{v}</span> },
    { key: 'date', label: 'Date' },
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

      {/* CRA Auditor notice */}
      {user?.role === 'CRA Auditor' && (
        <div className="mb-5 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 flex items-center gap-2">
          <Lock size={15} />
          You are viewing in <strong>CRA Auditor read-only mode</strong>. No edits are permitted for compliance purposes.
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        {[
          { key: 'experiments', label: 'Experiment Logs' },
          { key: 'timeline', label: 'Chronology/Timeline' },
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

      {activeTab === 'experiments' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={16} className="text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-700">Experiment Logs</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">{experiments.length} experiment record(s)</p>
          <Table columns={experimentColumns} data={experiments} />
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-700">Chronology / Timeline</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">{timelineEvents.length} timeline event(s)</p>
          <Table columns={timelineColumns} data={timelineEvents} />
        </div>
      )}

      {activeTab === 'versions' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={16} className="text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-700">Version History</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">{versionHistory.length} version record(s)</p>
          <Table columns={versionColumns} data={versionHistory} />
        </div>
      )}

      {activeTab === 'approvals' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={16} className="text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-700">Approval Records</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">{approvalRecords.length} approval record(s)</p>
          <Table columns={approvalColumns} data={approvalRecords} />
        </div>
      )}
    </div>
  );
}
