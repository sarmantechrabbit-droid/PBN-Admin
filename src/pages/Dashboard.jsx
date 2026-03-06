import { motion } from 'framer-motion';
import {
  FlaskConical, TrendingUp, ShoppingCart, Clock,
  AlertTriangle, Calendar, Truck, Fuel, Package,
  CheckCircle, XCircle, Eye,
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
  Admin: ['restaurant', 'warehouse', 'delivery'],
  Manager: ['restaurant', 'warehouse'],
  Chef: ['chef'],
  'Warehouse Staff': ['warehouse'],
  'Delivery Staff': ['delivery'],
  Auditor: ['restaurant', 'warehouse', 'delivery'],
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
                title="Avg Order Time"
                value={orderStats.avgOrderTime}
                subtitle={`${orderStats.completedToday} completed today`}
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
                title="Total Inventory Items"
                value={inventoryStats.totalItems}
                subtitle="Active ingredients"
                icon={Package}
                color="emerald"
              />
              <StatCard
                title="Low Stock Alerts"
                value={inventoryStats.lowStock}
                subtitle="Need restocking"
                icon={AlertTriangle}
                color="amber"
                trend={-1}
              />
              <StatCard
                title="Expiring Soon"
                value={inventoryStats.expiringItems}
                subtitle="Within 7 days"
                icon={Calendar}
                color="red"
              />
              <StatCard
                title="Damaged Goods"
                value={inventoryStats.damagedGoods}
                subtitle="Require inspection"
                icon={XCircle}
                color="red"
              />
            </div>
          </section>
        )}

        {/* Delivery Metrics */}
        {sections.includes('delivery') && (
          <section>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Delivery Metrics
            </h3>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard
                title="Delivery Efficiency"
                value={`${deliveryStats.avgEfficiency}%`}
                subtitle={`${deliveryStats.deliveredToday} delivered today`}
                icon={Truck}
                color="sky"
                trend={3}
              />
              <StatCard
                title="Avg Delivery Time"
                value={deliveryStats.avgDeliveryTime}
                subtitle="Across all routes"
                icon={Clock}
                color="purple"
              />
              <StatCard
                title="Fuel Consumed"
                value={`${deliveryStats.totalFuelL}L`}
                subtitle="Total today"
                icon={Fuel}
                color="amber"
              />
              <StatCard
                title="Delayed Deliveries"
                value={deliveryStats.delayedCount}
                subtitle="Past 24 hours"
                icon={AlertTriangle}
                color="red"
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
