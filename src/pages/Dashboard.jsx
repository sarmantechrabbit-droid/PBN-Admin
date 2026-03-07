import { motion } from 'framer-motion';
import {
  FlaskConical, TrendingUp, ShoppingCart, Clock,
  AlertTriangle, Calendar, Truck, Fuel, Package,
  CheckCircle, XCircle, Eye, Route, Zap, History,
  ClipboardList, BarChart3, Activity, Tags, Building2, MessageSquare,
} from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import PageHeader from '../components/ui/PageHeader';
import { experimentStats } from '../data/experiments';
import { inventoryStats } from '../data/inventory';
import { orderStats } from '../data/orders';
import { deliveryStats } from '../data/deliveries';
import { experiments } from '../data/experiments';
import { orders } from '../data/orders';

const roleConfigs = {
  'Corporate Admin': ['admin'],
  'Unit Manager': ['restaurant', 'warehouse'],
  'Chef': ['chef'],
  'Order Logger': ['orders'],
  'Quality Reviewer': ['restaurant', 'reviewer'],
  'Customer Feedback Collector': ['feedback'],
  'CRA Auditor': ['restaurant', 'warehouse', 'delivery', 'audit'],
};

export default function Dashboard({ user }) {
  const role = user?.role;
  const sections = roleConfigs[role] || ['restaurant'];

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0]} 👋`}
        subtitle={`${role} Dashboard — ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
      />

      <div className="space-y-8">
        {/* Restaurant Metrics */}
        {sections.includes('restaurant') && (
          <section>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Restaurant Metrics
            </h3>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard
                title="Experiment Success Rate"
                value={`${experimentStats.successRate}%`}
                subtitle={`${experimentStats.approvedThisMonth} approved this month`}
                icon={FlaskConical}
                color="purple"
                trend={4}
              />
              <StatCard
                title="Batch Failure Rate"
                value={`${experimentStats.batchFailureRate}%`}
                subtitle={`${experimentStats.failedThisMonth} failed this month`}
                icon={XCircle}
                color="red"
                trend={-2}
              />
              <StatCard
                title="Orders Per Hour"
                value={orderStats.ordersPerHour}
                subtitle={`Peak: ${orderStats.peakHour}`}
                icon={ShoppingCart}
                color="sky"
                trend={8}
              />
              <StatCard
                title="Peak Production Hours"
                value="2-4 PM"
                subtitle="Highest kitchen activity"
                icon={Clock}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Chef Metrics */}
        {sections.includes('chef') && (
          <section>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              My Experiments
            </h3>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard
                title="Total Experiments"
                value={experimentStats.totalExperiments}
                subtitle="All time submissions"
                icon={FlaskConical}
                color="purple"
              />
              <StatCard
                title="Pending Review"
                value={experimentStats.pendingReview}
                subtitle="Awaiting manager review"
                icon={Clock}
                color="amber"
              />
              <StatCard
                title="Approved"
                value={experimentStats.approvedThisMonth}
                subtitle="This month"
                icon={CheckCircle}
                color="emerald"
              />
              <StatCard
                title="Failed"
                value={experimentStats.failedThisMonth}
                subtitle="This month"
                icon={XCircle}
                color="red"
              />
            </div>
          </section>
        )}

        {/* Warehouse Metrics */}
        {sections.includes('warehouse') && (
          <section>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Warehouse Metrics
            </h3>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard
                title="Low Stock Alerts"
                value={inventoryStats.lowStock}
                subtitle="Need restocking"
                icon={AlertTriangle}
                color="amber"
                trend={-1}
              />
              <StatCard
                title="Expiring Ingredients"
                value={inventoryStats.expiringItems}
                subtitle="Within 7 days"
                icon={Calendar}
                color="red"
              />
              <StatCard
                title="Supplier Quality Issues"
                value={inventoryStats.damagedGoods}
                subtitle="Require inspection"
                icon={XCircle}
                color="red"
              />
              <StatCard
                title="Total Inventory Items"
                value={inventoryStats.totalItems}
                subtitle="Active ingredients"
                icon={Package}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Corporate Admin Metrics */}
        {sections.includes('admin') && (
          <section>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Corporate Admin Metrics
            </h3>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard
                title="Global Reports"
                value="12"
                subtitle="Reports generated this month"
                icon={BarChart3}
                color="purple"
                trend={5}
              />
              <StatCard
                title="AI Activity Logs"
                value="847"
                subtitle="AI operations logged"
                icon={Activity}
                color="sky"
                trend={12}
              />
              <StatCard
                title="Experiment Categories"
                value="8"
                subtitle="Active categories"
                icon={Tags}
                color="emerald"
              />
              <StatCard
                title="Branch Management"
                value="15"
                subtitle="Active branches"
                icon={Building2}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Order Logger Metrics */}
        {sections.includes('orders') && (
          <section>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Order Logging Metrics
            </h3>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard
                title="Orders Logged Today"
                value={orderStats.ordersPerHour * 8}
                subtitle="Across all shifts"
                icon={ShoppingCart}
                color="sky"
                trend={8}
              />
              <StatCard
                title="Peak Hours"
                value={orderStats.peakHour}
                subtitle="Highest activity"
                icon={Clock}
                color="amber"
              />
              <StatCard
                title="Order Accuracy"
                value="98.5%"
                subtitle="Correct order logging"
                icon={CheckCircle}
                color="emerald"
                trend={2}
              />
              <StatCard
                title="Linked to Experiments"
                value="23"
                subtitle="Orders linked to batches"
                icon={FlaskConical}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Quality Reviewer Metrics */}
        {sections.includes('reviewer') && (
          <section>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Quality Review Metrics
            </h3>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard
                title="Pending Reviews"
                value={experimentStats.pendingReview}
                subtitle="Awaiting approval"
                icon={Clock}
                color="amber"
              />
              <StatCard
                title="Approved Today"
                value="5"
                subtitle="Experiments approved"
                icon={CheckCircle}
                color="emerald"
                trend={3}
              />
              <StatCard
                title="Rejected Today"
                value="2"
                subtitle="Experiments rejected"
                icon={XCircle}
                color="red"
              />
              <StatCard
                title="AI Variance Analysis"
                value="12"
                subtitle="AI insights reviewed"
                icon={Zap}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Customer Feedback Metrics */}
        {sections.includes('feedback') && (
          <section>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Customer Feedback Metrics
            </h3>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard
                title="Feedback Collected"
                value="47"
                subtitle="This week"
                icon={MessageSquare}
                color="sky"
                trend={15}
              />
              <StatCard
                title="Average Rating"
                value="4.2"
                subtitle="Out of 5 stars"
                icon={TrendingUp}
                color="emerald"
                trend={0.3}
              />
              <StatCard
                title="Linked to Orders"
                value="89%"
                subtitle="Feedback with order ID"
                icon={ShoppingCart}
                color="purple"
              />
              <StatCard
                title="Complaint Resolution"
                value="24h"
                subtitle="Average response time"
                icon={Clock}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Audit Metrics */}
        {sections.includes('audit') && (
          <section>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Audit & Compliance Metrics
            </h3>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard
                title="Audit Logs"
                value="1,247"
                subtitle="Total entries"
                icon={ClipboardList}
                color="slate"
              />
              <StatCard
                title="Compliance Score"
                value="98.7%"
                subtitle="Overall compliance"
                icon={CheckCircle}
                color="emerald"
              />
              <StatCard
                title="Version History"
                value="156"
                subtitle="Tracked versions"
                icon={History}
                color="purple"
              />
              <StatCard
                title="Approval Records"
                value="89"
                subtitle="Documented approvals"
                icon={Eye}
                color="sky"
              />
            </div>
          </section>
        )}

        {/* Recent Activity Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Recent Experiments */}
          {(sections.includes('restaurant') || sections.includes('chef')) && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">Recent Experiments</h3>
                <Eye size={15} className="text-slate-400" />
              </div>
              <div className="space-y-3">
                {experiments.slice(0, 5).map((exp) => (
                  <motion.div
                    key={exp.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition"
                    whileHover={{ x: 2 }}
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">{exp.name}</p>
                      <p className="text-xs text-slate-400">{exp.id} · {exp.date} · {exp.chef}</p>
                    </div>
                    <Badge label={exp.status} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Orders */}
          {sections.includes('restaurant') && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">Today's Orders</h3>
                <ShoppingCart size={15} className="text-slate-400" />
              </div>
              <div className="space-y-3">
                {orders.slice(0, 5).map((ord) => (
                  <motion.div
                    key={ord.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition"
                    whileHover={{ x: 2 }}
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">{ord.id}</p>
                      <p className="text-xs text-slate-400">{ord.items.join(', ')} · {ord.time}</p>
                    </div>
                    <Badge label={ord.status} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
