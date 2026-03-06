import { useState } from 'react';
import { Search, Package, AlertTriangle, Calendar, XCircle } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
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
    { key: 'id', label: 'ID' },
    {
      key: 'ingredient',
      label: 'Ingredient',
      render: (v) => <span className="font-medium text-slate-800">{v}</span>,
    },
    {
      key: 'quantity',
      label: 'Quantity',
      render: (v, row) => `${v} ${row.unit}`,
    },
    { key: 'supplier', label: 'Supplier' },
    { key: 'supplierBatch', label: 'Batch #' },
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
      label: 'Quality',
      render: (v) => <Badge label={v} />,
    },
    {
      key: 'stockLevel',
      label: 'Stock Level',
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

      {/* Alerts for critical items */}
      {inventory.filter((i) => i.stockLevel === 'Critical' || i.qualityStatus === 'Damaged').length > 0 && (
        <div className="mb-5 space-y-2">
          {inventory
            .filter((i) => i.stockLevel === 'Critical' || i.qualityStatus === 'Damaged')
            .map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
              >
                <AlertTriangle size={16} className="text-red-500 shrink-0" />
                <span>
                  <strong>{item.ingredient}</strong> ({item.id}) —{' '}
                  {item.qualityStatus === 'Damaged' ? 'Batch damaged on arrival.' : 'Critical stock level.'}{' '}
                  Batch: {item.supplierBatch}
                </span>
              </div>
            ))}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <p className="text-xs text-slate-400 mb-4">{filtered.length} item(s) found</p>
        <Table columns={columns} data={filtered} emptyMessage="No inventory items match your filters." />
      </div>
    </div>
  );
}
