import { Sparkles, RefreshCw, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import AlertCard from '../components/ui/AlertCard';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import { insights } from '../data/insights';

const SEVERITY_ORDER = { High: 0, Medium: 1, Low: 2 };

const getSeverityIcon = (severity) => {
  switch (severity) {
    case 'High': return <AlertCircle size={16} className="text-red-500" />;
    case 'Medium': return <AlertTriangle size={16} className="text-amber-500" />;
    case 'Low': return <Info size={16} className="text-sky-500" />;
    default: return <Info size={16} className="text-slate-400" />;
  }
};

const getSeverityColor = (severity) => {
  switch (severity) {
    case 'High': return 'bg-red-50 border-red-200 text-red-700';
    case 'Medium': return 'bg-amber-50 border-amber-200 text-amber-700';
    case 'Low': return 'bg-sky-50 border-sky-200 text-sky-700';
    default: return 'bg-slate-50 border-slate-200 text-slate-700';
  }
};

export default function AIInsights() {
  const [activeTab, setActiveTab] = useState('cards');
  const [filter, setFilter] = useState('All');
  const [refreshed, setRefreshed] = useState(false);

  const types = ['All', 'error', 'warning', 'info'];

  const filtered = insights
    .filter((i) => filter === 'All' || i.type === filter)
    .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);

  async function handleRefresh() {
    setRefreshed(true);
    await new Promise((r) => setTimeout(r, 1000));
    setRefreshed(false);
  }

  return (
    <div>
      <PageHeader
        title="AI Insights"
        subtitle="Automated analysis of experiments, inventory, and delivery performance"
        actions={
          <Button onClick={handleRefresh} variant="outline" icon={RefreshCw} disabled={refreshed}>
            {refreshed ? 'Refreshing...' : 'Refresh Analysis'}
          </Button>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        {[
          { key: 'cards', label: 'Insight Cards' },
          { key: 'history', label: 'Historical Insights' },
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

      {activeTab === 'cards' ? (
        <div>
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Critical', count: insights.filter((i) => i.severity === 'High').length, color: 'bg-red-50 border-red-200 text-red-700', icon: <AlertCircle size={20} /> },
              { label: 'Warning', count: insights.filter((i) => i.severity === 'Medium').length, color: 'bg-amber-50 border-amber-200 text-amber-700', icon: <AlertTriangle size={20} /> },
              { label: 'Informational', count: insights.filter((i) => i.severity === 'Low').length, color: 'bg-sky-50 border-sky-200 text-sky-700', icon: <Info size={20} /> },
            ].map((item) => (
              <div key={item.label} className={`border rounded-2xl p-4 flex items-center gap-3 ${item.color}`}>
                {item.icon}
                <div>
                  <div className="text-2xl font-bold">{item.count}</div>
                  <div className="text-sm font-semibold">{item.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                  filter === t
                    ? 'bg-primary text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t === 'All' ? 'All Insights' : t === 'error' ? 'Critical' : t === 'warning' ? 'Warnings' : 'Informational'}
              </button>
            ))}
          </div>

          {/* Powered by badge */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-light border border-primary/20 rounded-full">
              <Sparkles size={13} className="text-primary" />
              <span className="text-xs font-semibold text-primary-text">Powered by PBN AI Analysis Engine</span>
            </div>
            <span className="text-xs text-slate-400">Last updated: {new Date().toLocaleTimeString()}</span>
          </div>

          {/* Insight Cards */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.07 } },
              hidden: {},
            }}
          >
            {filtered.map((insight) => (
              <motion.div
                key={insight.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <AlertCard
                  title={insight.title}
                  description={insight.description}
                  type={insight.type}
                  severity={insight.severity}
                  date={insight.date}
                  recommendation={insight.recommendation}
                />
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-16 text-slate-400 text-sm">
                No insights for this filter.
              </div>
            )}
          </motion.div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Historical Insights</h3>
          <p className="text-xs text-slate-400 mb-4">{insights.length} insight record(s)</p>
          <Table 
            columns={[
              { 
                key: 'type', 
                label: 'Insight Type',
                render: (v) => (
                  <span className="capitalize font-medium text-slate-800">
                    {v === 'error' ? 'Critical' : v === 'warning' ? 'Warning' : 'Informational'}
                  </span>
                )
              },
              { 
                key: 'title', 
                label: 'Description',
                render: (v) => <span className="text-sm text-slate-700">{v}</span>
              },
              { 
                key: 'severity', 
                label: 'Severity',
                render: (v) => (
                  <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(v)}`}>
                    {getSeverityIcon(v)}
                    {v}
                  </div>
                )
              },
              { key: 'date', label: 'Date' }
            ]} 
            data={insights} 
          />
        </div>
      )}
    </div>
  );
}
