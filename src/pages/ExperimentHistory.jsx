import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import { experiments } from '../data/experiments';

const ALL_STATUSES = ['All', 'Approved', 'Under Review', 'Failed', 'Pending'];

export default function ExperimentHistory({ user }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const isChef = user?.role === 'Chef';

  const filtered = experiments.filter((exp) => {
    const matchSearch =
      exp.name.toLowerCase().includes(search.toLowerCase()) ||
      exp.id.toLowerCase().includes(search.toLowerCase()) ||
      exp.chef.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || exp.status === statusFilter;
    const matchChef = isChef ? exp.chef === user?.name : true;
    return matchSearch && matchStatus && matchChef;
  });

  const columns = [
    { key: 'id', label: 'Experiment ID' },
    { key: 'name', label: 'Name', render: (v) => <span className="font-medium text-slate-800">{v}</span> },
    { key: 'recipeVersion', label: 'Version' },
    { key: 'chef', label: 'Chef' },
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

  return (
    <div>
      <PageHeader
        title="Experiment History"
        subtitle={isChef ? 'Your submitted experiments' : 'All experiment records across all chefs'}
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
          const count = experiments.filter(
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
    </div>
  );
}
