import { useState } from 'react';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import { orders } from '../data/orders';
import { experiments } from '../data/experiments';

const defaultForm = {
  orderId: '',
  items: '',
  quantity: '',
  time: '',
  experimentBatch: '',
  table: '',
};

export default function OrderLogging({ user }) {
  const [form, setForm] = useState(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('log');

  const isReadOnly = user?.role === 'Auditor';

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSubmitted(true);
  }

  const columns = [
    { key: 'id', label: 'Order ID' },
    {
      key: 'items',
      label: 'Items',
      render: (v) => <span className="text-xs">{v.join(', ')}</span>,
    },
    { key: 'quantity', label: 'Qty' },
    { key: 'time', label: 'Time' },
    { key: 'table', label: 'Table' },
    { key: 'experimentBatch', label: 'Exp. Batch' },
    {
      key: 'status',
      label: 'Status',
      render: (v) => <Badge label={v} />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Order Logging"
        subtitle="Record and track restaurant orders linked to experiment batches"
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        {['log', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition capitalize ${
              activeTab === tab ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab === 'log' ? 'Log Order' : 'Order History'}
          </button>
        ))}
      </div>

      {activeTab === 'log' ? (
        submitted ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <CheckCircle size={64} className="text-emerald-500" />
            </motion.div>
            <h2 className="text-xl font-bold text-slate-800">Order Logged!</h2>
            <p className="text-slate-500 text-sm">Order has been recorded successfully.</p>
            <Button onClick={() => { setForm(defaultForm); setSubmitted(false); }} variant="outline">
              Log Another Order
            </Button>
          </div>
        ) : (
          <div className="max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-5 flex items-center gap-2">
                  <ShoppingCart size={16} className="text-secondary" />
                  Order Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormInput
                    label="Order ID"
                    name="orderId"
                    value={form.orderId}
                    onChange={handleChange}
                    required
                    placeholder="e.g. ORD-1009"
                    disabled={isReadOnly}
                  />
                  <FormInput
                    label="Table Number"
                    name="table"
                    value={form.table}
                    onChange={handleChange}
                    placeholder="e.g. T-08"
                    disabled={isReadOnly}
                  />
                  <div className="md:col-span-2">
                    <FormInput
                      label="Items Ordered"
                      name="items"
                      value={form.items}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Lamb Rendang, Saffron Rice (comma separated)"
                      disabled={isReadOnly}
                    />
                  </div>
                  <FormInput
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={form.quantity}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 2"
                    disabled={isReadOnly}
                  />
                  <FormInput
                    label="Order Time"
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                    disabled={isReadOnly}
                  />
                  <div className="md:col-span-2">
                    <FormInput
                      label="Experiment Batch Link"
                      name="experimentBatch"
                      type="select"
                      value={form.experimentBatch}
                      onChange={handleChange}
                      required
                      options={experiments.map((e) => ({
                        value: e.id,
                        label: `${e.id} — ${e.name}`,
                      }))}
                      disabled={isReadOnly}
                    />
                  </div>
                </div>
              </div>

              {!isReadOnly && (
                <div className="flex gap-3">
                  <Button type="submit" disabled={loading} icon={ShoppingCart} variant="secondary">
                    {loading ? 'Saving...' : 'Log Order'}
                  </Button>
                  <Button variant="outline" type="button" onClick={() => setForm(defaultForm)}>
                    Clear
                  </Button>
                </div>
              )}
            </form>
          </div>
        )
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <p className="text-xs text-slate-400 mb-4">{orders.length} order(s) today</p>
          <Table columns={columns} data={orders} />
        </div>
      )}
    </div>
  );
}
