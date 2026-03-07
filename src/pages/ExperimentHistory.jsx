import { useState } from 'react';
import { Search, Filter, UserPlus, Users, Settings, CheckCircle, XCircle, Eye } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { experiments } from '../data/experiments';
import { AssignChefModal, AssignReviewerModal, ConfigureMetadataModal } from '../components/ui/ExperimentModals';
import ReviewerApprovalModal from '../components/ui/ReviewerApprovalModal';
import ExperimentDetailsModal from '../components/ui/ExperimentDetailsModal';
import { rolePermissions, canPerformAction, getRoleRestrictions } from '../utils/rolePermissions';

const ALL_STATUSES = ['All', 'Approved', 'Under Review', 'Failed', 'Pending'];

export default function ExperimentHistory({ user }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [experimentsData, setExperimentsData] = useState(experiments);

  const role = user?.role;
  const isChef = role === 'Chef';
  const isUnitManager = role === 'Unit Manager';
  const isQualityReviewer = role === 'Quality Reviewer';
  const isCRAuditor = role === 'CRA Auditor';
  const perms = rolePermissions[role] || {};
  const restrictions = getRoleRestrictions(role);
  const isReadOnly = restrictions.readOnly;

  const filtered = experimentsData.filter((exp) => {
    const matchSearch =
      exp.name.toLowerCase().includes(search.toLowerCase()) ||
      exp.id.toLowerCase().includes(search.toLowerCase()) ||
      exp.chef.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || exp.status === statusFilter;
    const matchChef = isChef ? exp.chef === user?.name : true;
    return matchSearch && matchStatus && matchChef;
  });

  const handleAssignment = (experimentId, updates) => {
    setExperimentsData(prev => 
      prev.map(exp => 
        exp.id === experimentId ? { ...exp, ...updates } : exp
      )
    );
  };

  const handleApproval = (experimentId, remarks) => {
    setExperimentsData(prev => 
      prev.map(exp => 
        exp.id === experimentId 
          ? { ...exp, status: 'Approved', reviewerRemarks: remarks, reviewedBy: user?.name, reviewedDate: new Date().toISOString().split('T')[0] }
          : exp
      )
    );
  };

  const handleRejection = (experimentId, remarks) => {
    setExperimentsData(prev => 
      prev.map(exp => 
        exp.id === experimentId 
          ? { ...exp, status: 'Failed', reviewerRemarks: remarks, reviewedBy: user?.name, reviewedDate: new Date().toISOString().split('T')[0] }
          : exp
      )
    );
  };

  const openModal = (experiment, type) => {
    setSelectedExperiment(experiment);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedExperiment(null);
    setModalType(null);
  };

  const canModifyExperiment = (experiment) => {
    return isUnitManager && experiment.status === 'Pending';
  };

  const canReviewExperiment = (experiment) => {
    return isQualityReviewer && (experiment.status === 'Under Review' || experiment.status === 'Pending');
  };

  const baseColumns = [
    { key: 'id', label: 'Experiment ID' },
    { key: 'name', label: 'Name', render: (v) => <span className="font-medium text-slate-800">{v}</span> },
    { key: 'recipeVersion', label: 'Version' },
    { key: 'chef', label: 'Chef' },
  ];

  const managerColumns = isUnitManager ? [
    { key: 'assignedChef', label: 'Assigned Chef', render: (v) => v || <span className="text-slate-400 text-xs">Not assigned</span> },
    { key: 'assignedReviewer', label: 'Assigned Reviewer', render: (v) => v || <span className="text-slate-400 text-xs">Not assigned</span> },
    { key: 'batchId', label: 'Batch ID', render: (v) => v || <span className="text-slate-400 text-xs">Not set</span> },
    { key: 'temperatureLog', label: 'Temperature Log', render: (v) => v ? `${v}°C` : <span className="text-slate-400 text-xs">Not set</span> },
    { key: 'ingredientLotNumber', label: 'Ingredient Lot', render: (v) => v || <span className="text-slate-400 text-xs">Not set</span> },
  ] : [];

  const endColumns = [
    { key: 'date', label: 'Date' },
    {
      key: 'status',
      label: 'Status',
      render: (v) => <Badge label={v} />,
    },
    {
      key: 'successRate',
      label: 'Success Rate',
      render: (v) =>
        v !== null && v !== undefined ? (
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full ${v >= 80 ? 'bg-emerald-500' : v >= 50 ? 'bg-amber-400' : 'bg-red-400'}`}
                style={{ width: `${v}%` }}
              />
            </div>
            <span className="text-xs text-slate-500">{v}%</span>
          </div>
        ) : (
          <span className="text-xs text-slate-400">N/A</span>
        ),
    },
    {
      key: 'reviewerRemarks',
      label: 'Reviewer Remarks',
      render: (v) => (
        <span className="text-xs text-slate-500 max-w-48 block truncate" title={v}>
          {v}
        </span>
      ),
    },
  ];

  const actionColumn = (isUnitManager || isQualityReviewer || isCRAuditor) ? [{
    key: 'actions',
    label: 'Actions',
    render: (_, experiment) => (
      <div className="flex gap-1">
        {/* View Details button for CRA Auditor */}
        {isCRAuditor && (
          <Button
            size="sm"
            variant="outline"
            icon={Eye}
            onClick={() => openModal(experiment, 'viewDetails')}
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            View Details
          </Button>
        )}
        
        {/* Unit Manager actions */}
        {canModifyExperiment(experiment) && (
          <>
            <Button
              size="sm"
              variant="outline"
              icon={UserPlus}
              onClick={() => openModal(experiment, 'assignChef')}
            >
              Assign Chef
            </Button>
            <Button
              size="sm"
              variant="outline"
              icon={Users}
              onClick={() => openModal(experiment, 'assignReviewer')}
            >
              Assign Reviewer
            </Button>
            <Button
              size="sm"
              variant="outline"
              icon={Settings}
              onClick={() => openModal(experiment, 'configureMetadata')}
            >
              Configure
            </Button>
          </>
        )}
        
        {/* Quality Reviewer actions */}
        {canReviewExperiment(experiment) && (
          <>
            <Button
              size="sm"
              variant="outline"
              icon={CheckCircle}
              onClick={() => openModal(experiment, 'approve')}
              className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
            >
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              icon={XCircle}
              onClick={() => openModal(experiment, 'reject')}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              Reject
            </Button>
          </>
        )}
      </div>
    ),
  }] : [];

  const columns = [...baseColumns, ...managerColumns, ...endColumns, ...actionColumn];

  return (
    <div>
      <PageHeader
        title="Experiment History"
        subtitle={
          isChef ? 'Your submitted experiments' : 
          isUnitManager ? 'Manage experiments for your outlet' : 
          isQualityReviewer ? 'Review and approve experiments' :
          isCRAuditor ? 'Read-only audit view of all experiments' :
          'All experiment records across all chefs'
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, or chef..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-slate-400" />
          <div className="flex gap-1.5">
            {ALL_STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  statusFilter === s
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary strip */}
      <div className="flex gap-4 mb-5">
        {ALL_STATUSES.filter((s) => s !== 'All').map((s) => {
          const count = experimentsData.filter(
            (e) => e.status === s && (isChef ? e.chef === user?.name : true)
          ).length;
          return (
            <div key={s} className="flex items-center gap-2">
              <Badge label={s} />
              <span className="text-xs text-slate-500 font-semibold">{count}</span>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <p className="text-xs text-slate-400 mb-4">{filtered.length} result(s) found</p>
        <Table
          columns={columns}
          data={filtered}
          emptyMessage="No experiments match your filters."
        />
      </div>

      {/* Modals */}
      <AssignChefModal
        isOpen={modalType === 'assignChef'}
        onClose={closeModal}
        experiment={selectedExperiment}
        onSave={handleAssignment}
      />
      
      <AssignReviewerModal
        isOpen={modalType === 'assignReviewer'}
        onClose={closeModal}
        experiment={selectedExperiment}
        onSave={handleAssignment}
      />
      
      <ConfigureMetadataModal
        isOpen={modalType === 'configureMetadata'}
        onClose={closeModal}
        experiment={selectedExperiment}
        onSave={handleAssignment}
      />

      <ReviewerApprovalModal
        isOpen={modalType === 'approve' || modalType === 'reject'}
        onClose={closeModal}
        experiment={selectedExperiment}
        onApprove={handleApproval}
        onReject={handleRejection}
      />

      <ExperimentDetailsModal
        isOpen={modalType === 'viewDetails'}
        onClose={closeModal}
        experiment={selectedExperiment}
        userRole={role}
      />
    </div>
  );
}
