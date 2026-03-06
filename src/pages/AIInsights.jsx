import { Sparkles, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import AlertCard from '../components/ui/AlertCard';
import Button from '../components/ui/Button';
import { insights } from '../data/insights';

const SEVERITY_ORDER = { High: 0, Medium: 1, Low: 2 };

export default function AIInsights() {
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

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'High Risk', count: insights.filter((i) => i.severity === 'High').length, color: 'bg-red-50 border-red-200 text-red-700' },
          { label: 'Medium Risk', count: insights.filter((i) => i.severity === 'Medium').length, color: 'bg-amber-50 border-amber-200 text-amber-700' },
          { label: 'Low / Info', count: insights.filter((i) => i.severity === 'Low').length, color: 'bg-sky-50 border-sky-200 text-sky-700' },
        ].map((item) => (
          <div key={item.label} className={`border rounded-2xl p-4 flex items-center gap-3 ${item.color}`}>
            <div className="text-2xl font-bold">{item.count}</div>
            <div className="text-sm font-semibold">{item.label}</div>
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
  );
}
