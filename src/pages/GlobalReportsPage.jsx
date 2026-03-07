import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, AlertTriangle } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';
import { mockGlobalReports } from '../data/corporateAdmin';

export default function GlobalReportsPage() {
  const { experimentSuccessRate, batchFailureRate, deliveryEfficiency, supplierQualityIssues } = mockGlobalReports;

  const MetricCard = ({ title, current, previous, trend, suffix = '%', icon: Icon, color }) => {
    const isPositive = trend === 'up';
    const change = Math.abs(current - previous).toFixed(1);
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
            <Icon size={24} className="text-white" />
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? 'text-emerald-600' : 'text-red-600'
          }`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {change}{suffix}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-1">
          {current}{suffix}
        </h3>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-xs text-slate-400 mt-2">
          vs {previous}{suffix} last period
        </p>
      </div>
    );
  };

  const SimpleChart = ({ data, color, type = 'line' }) => {
    const maxValue = Math.max(...data.map(d => d.rate || d.issues));
    const minValue = Math.min(...data.map(d => d.rate || d.issues));
    const range = maxValue - minValue;

    return (
      <div className="h-32 flex items-end justify-between gap-2 px-4">
        {data.map((item, index) => {
          const value = item.rate || item.issues;
          const height = range > 0 ? ((value - minValue) / range) * 100 : 50;
          
          return (
            <div key={index} className="flex flex-col items-center gap-2 flex-1">
              <div className="relative w-full flex items-end justify-center" style={{ height: '80px' }}>
                {type === 'bar' ? (
                  <div
                    className={`w-8 ${color} rounded-t-sm transition-all duration-500`}
                    style={{ height: `${Math.max(height, 10)}%` }}
                  />
                ) : (
                  <div className="w-full relative">
                    <div
                      className={`w-2 h-2 ${color.replace('bg-', 'bg-')} rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2`}
                      style={{ bottom: `${height}%` }}
                    />
                    {index > 0 && (
                      <div
                        className={`absolute h-0.5 ${color} opacity-50`}
                        style={{
                          bottom: `${height}%`,
                          left: '-50%',
                          right: '50%',
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
              <span className="text-xs text-slate-400 font-medium">{item.month}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Global Reports"
        subtitle="Performance metrics across all branches"
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Experiment Success Rate"
          current={experimentSuccessRate.current}
          previous={experimentSuccessRate.previous}
          trend={experimentSuccessRate.trend}
          icon={BarChart3}
          color="bg-emerald-500"
        />
        
        <MetricCard
          title="Batch Failure Rate"
          current={batchFailureRate.current}
          previous={batchFailureRate.previous}
          trend={batchFailureRate.trend}
          icon={AlertTriangle}
          color="bg-red-500"
        />
        
        <MetricCard
          title="Delivery Efficiency"
          current={deliveryEfficiency.current}
          previous={deliveryEfficiency.previous}
          trend={deliveryEfficiency.trend}
          icon={TrendingUp}
          color="bg-blue-500"
        />
        
        <MetricCard
          title="Supplier Quality Issues"
          current={supplierQualityIssues.current}
          previous={supplierQualityIssues.previous}
          trend={supplierQualityIssues.trend}
          icon={AlertTriangle}
          color="bg-amber-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Experiment Success Trend</h3>
          <SimpleChart data={experimentSuccessRate.data} color="bg-emerald-500" />
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Batch Failure Trend</h3>
          <SimpleChart data={batchFailureRate.data} color="bg-red-500" type="bar" />
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Delivery Performance</h3>
          <SimpleChart data={deliveryEfficiency.data} color="bg-blue-500" />
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Quality Issues</h3>
          <SimpleChart data={supplierQualityIssues.data} color="bg-amber-500" type="bar" />
        </div>
      </div>
    </motion.div>
  );
}