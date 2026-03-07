import { X, FileText, Clock, GitBranch, CheckCircle2 } from 'lucide-react';
import Modal from './Modal';
import Badge from './Badge';
import Timeline from './Timeline';
import Table from './Table';

export default function ExperimentDetailsModal({ isOpen, onClose, experiment, userRole }) {
  if (!experiment) return null;

  const isCRAuditor = userRole === 'CRA Auditor';

  const versionColumns = [
    { key: 'version', label: 'Version Number' },
    { key: 'modifiedBy', label: 'Modified By' },
    { key: 'changeDescription', label: 'Change Description' },
    { key: 'date', label: 'Date' }
  ];

  const approvalColumns = [
    { key: 'reviewerName', label: 'Reviewer Name' },
    { 
      key: 'decision', 
      label: 'Decision',
      render: (v) => (
        <Badge 
          label={v} 
          className={v === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}
        />
      )
    },
    { key: 'remarks', label: 'Remarks' },
    { key: 'date', label: 'Date' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" title={`${experiment.name} - ${experiment.id}`}>
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-slate-50 rounded-xl p-4">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <FileText size={16} />
            Basic Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Recipe Version:</span>
              <p className="font-medium">{experiment.recipeVersion}</p>
            </div>
            <div>
              <span className="text-slate-500">Chef:</span>
              <p className="font-medium">{experiment.chef}</p>
            </div>
            <div>
              <span className="text-slate-500">Status:</span>
              <Badge label={experiment.status} />
            </div>
            <div>
              <span className="text-slate-500">Assigned Reviewer:</span>
              <p className="font-medium">{experiment.assignedReviewer || 'Not assigned'}</p>
            </div>
            <div>
              <span className="text-slate-500">Batch ID:</span>
              <p className="font-medium">{experiment.batchId || 'Not set'}</p>
            </div>
            <div>
              <span className="text-slate-500">Success Rate:</span>
              <p className="font-medium">{experiment.successRate ? `${experiment.successRate}%` : 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Chronology Timeline */}
        {isCRAuditor && experiment.chronology && (
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Clock size={16} />
              Chronology Timeline
            </h3>
            <Timeline events={experiment.chronology} />
          </div>
        )}

        {/* Version History */}
        {isCRAuditor && experiment.versionHistory && (
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <GitBranch size={16} />
              Version History
            </h3>
            <Table
              columns={versionColumns}
              data={experiment.versionHistory}
              emptyMessage="No version history available."
            />
          </div>
        )}

        {/* Approval Records */}
        {isCRAuditor && experiment.approvalRecords && (
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle2 size={16} />
              Approval Records
            </h3>
            {experiment.approvalRecords.length > 0 ? (
              <Table
                columns={approvalColumns}
                data={experiment.approvalRecords}
                emptyMessage="No approval records available."
              />
            ) : (
              <p className="text-sm text-slate-500 text-center py-4">No approval records available.</p>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}