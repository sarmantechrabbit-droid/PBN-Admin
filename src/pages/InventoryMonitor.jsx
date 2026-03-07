import { useState } from 'react';
import { Search, Package, AlertTriangle, Calendar, XCircle, Brain } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
import AlertCard from '../components/ui/AlertCard';
import { inventory, inventoryStats } from '../data/inventory';

const ALL_STOCK = ['All', 'Normal', 'Low', 'Critical'];
const ALL_QUALITY = ['All', 'Good', 'Expiring Soon', 'Damaged'];

export default function InventoryMonitor() {
  const [search, setSearch] = useState('');
  const [stockFilter, setStockFilter] = useState('All');
  const [qualityFilter, setQualityFilter] = useState('All');

  const filtered = inventory.filter((item) => {
    const matchSearch =
      item.ingredient.toLowerCase().includes(search.toLowerCase()) ||
      item.supplierBatch.toLowerCase().includes(search.toLowerCase()) ||
      item.supplier.toLowerCase().includes(search.toLowerCase());
    const matchStock = stockFilter === 'All' || item.stockLevel === stockFilter;
    const matchQuality = qualityFilter === 'All' || item.qualityStatus === qualityFilter;
    return matchSearch && matchStock && matchQuality;
  });

  const columns = [
    {
      key: 'ingredient',
      label: 'Ingredient Name',
      render: (v) => <span className="font-medium text-slate-800">{v}</span>,
    },
    {
      key: 'quantity',
      label: 'Available Quantity',
      render: (v, row) => `${v} ${row.unit}`,
    },
    { key: 'supplierBatch', label: 'Supplier Batch' },
    {
      key: 'expiryDate',
      label: 'Expiry Date',
      render: (v) => {
        const days = Math.ceil((new Date(v) - new Date()) / 86400000);
        return (
          <span className={days <= 7 ? 'text-red-600 font-semibold' : 'text-slate-700'}>
            {v} {days <= 7 && `(${days}d)`}
          </span>
        );
      },
    },
    {
      key: 'qualityStatus',
      label: 'Status',
      render: (v) => <Badge label={v} />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Inventory Monitor"
        subtitle="Real-time stock levels, quality status, and expiry tracking"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Items" value={inventoryStats.totalItems} icon={Package} color="emerald" />
        <StatCard title="Low Stock" value={inventoryStats.lowStock} icon={AlertTriangle} color="amber" />
        <StatCard title="Expiring Soon" value={inventoryStats.expiringItems} icon={Calendar} color="red" />
        <StatCard title="Damaged" value={inventoryStats.damagedGoods} icon={XCircle} color="red" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ingredient, batch, supplier..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          />
        </div>

        <div className="flex gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 self-center">Stock:</span>
          {ALL_STOCK.map((s) => (
            <button
              key={s}
              onClick={() => setStockFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                stockFilter === s
                  ? 'bg-primary text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 self-center">Quality:</span>
          {ALL_QUALITY.map((q) => (
            <button
              key={q}
              onClick={() => setQualityFilter(q)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                qualityFilter === q
                  ? 'bg-secondary text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Current Stock Levels */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Current Stock Levels</h3>
        <p className="text-xs text-slate-400 mb-4">{filtered.length} item(s) found</p>
        <Table columns={columns} data={filtered} emptyMessage="No inventory items match your filters." />
      </div>

      {/* Near Expiry Materials */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-amber-500" />
            Near Expiry Materials
          </h3>
          <div className="space-y-3">
            {inventory
              .filter((item) => {
                const days = Math.ceil((new Date(item.expiryDate) - new Date()) / 86400000);
                return days <= 7 && days > 0;
              })
              .map((item) => {
                const days = Math.ceil((new Date(item.expiryDate) - new Date()) / 86400000);
                return (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-amber-800">{item.ingredient}</p>
                      <p className="text-xs text-amber-600">Batch: {item.supplierBatch}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-amber-700">{item.expiryDate}</p>
                      <p className="text-xs text-amber-600">{days} days remaining</p>
                    </div>
                  </div>
                );
              })}
            {inventory.filter((item) => {
              const days = Math.ceil((new Date(item.expiryDate) - new Date()) / 86400000);
              return days <= 7 && days > 0;
            }).length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">No items expiring soon</p>
            )}
          </div>
        </div>

        {/* Damaged Goods */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <XCircle size={16} className="text-red-500" />
            Damaged Goods
          </h3>
          <div className="space-y-3">
            {inventory
              .filter((item) => item.qualityStatus === 'Damaged')
              .map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-red-800">{item.ingredient}</p>
                    <p className="text-xs text-red-600">Batch: {item.supplierBatch}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-red-700">{item.quantity} {item.unit}</p>
                    <p className="text-xs text-red-600">Quality Issue</p>
                  </div>
                </div>
              ))}
            {inventory.filter((item) => item.qualityStatus === 'Damaged').length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">No damaged goods</p>
            )}
          </div>
        </div>
      </div>

      {/* AI Alerts Section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <Brain size={16} className="text-purple-500" />
          AI Alerts
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <AlertCard
            type="error"
            title="Ingredient Quality Issue Detected"
            description="Black Truffle batch SUP-TRFL-03 shows signs of deterioration. Immediate inspection required."
            severity="Critical"
            date="2 hours ago"
            recommendation="Remove from active inventory and conduct quality assessment."
          />
          <AlertCard
            type="warning"
            title="Expiry Risk Alert"
            description="Heavy Cream and Chicken Breast are approaching expiry dates within 48 hours."
            severity="High"
            date="4 hours ago"
            recommendation="Prioritize usage in upcoming meal preparations or consider discounting."
          />
          <AlertCard
            type="warning"
            title="Repeated Damaged Goods"
            description="Supplier 'Luxe Pantry Imports' has delivered 3 damaged batches in the past month."
            severity="Medium"
            date="1 day ago"
            recommendation="Review supplier contract and consider alternative sources."
          />
          <AlertCard
            type="info"
            title="Stock Optimization Opportunity"
            description="Basmati Rice usage patterns suggest reducing order quantities by 15%."
            severity="Low"
            date="2 days ago"
            recommendation="Adjust next order to optimize storage costs and reduce waste."
          />
        </div>
      </div>
    </div>
  );
}
