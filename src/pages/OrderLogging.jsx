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
import { canPerformAction, getRoleRestrictions } from '../utils/rolePermissions';

const defaultForm = {
  orderId: '',
  items: [],
  quantity: '',
  time: '',
  experimentBatch: '',
  posSummary: null,
};

export default function OrderLogging({ user }) {
  const [form, setForm] = useState(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('log');
  const [itemInput, setItemInput] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const role = user?.role;
  const restrictions = getRoleRestrictions(role);
  const isReadOnly = restrictions.readOnly || role === 'CRA Auditor';
  const canLogOrders = canPerformAction(role, 'canLogOrders');
  const canViewOrders = canPerformAction(role, 'canViewOrders');
  const canDeleteOrderLogs = !restrictions.cannotDeleteOrderLogs;

  function handleFileChange(e) {
    const file = e.target.files[0];
    setForm({ ...form, posSummary: file });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: '' });
    }
  }

  function handleAddItem() {
    if (itemInput.trim() && !form.items.includes(itemInput.trim())) {
      setForm({ ...form, items: [...form.items, itemInput.trim()] });
      setItemInput('');
    }
  }

  function handleRemoveItem(index) {
    setForm({ ...form, items: form.items.filter((_, i) => i !== index) });
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem();
    }
  }

  function validateForm() {
    const errors = {};
    if (!form.orderId.trim()) errors.orderId = 'Order ID is required';
    if (form.items.length === 0) errors.items = 'At least one item is required';
    if (!form.quantity) errors.quantity = 'Quantity is required';
    if (!form.time) errors.time = 'Order time is required';
    if (!form.experimentBatch) errors.experimentBatch = 'Experiment batch link is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
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
    { key: 'quantity', label: 'Quantity' },
    { key: 'time', label: 'Time' },
    { key: 'experimentBatch', label: 'Linked Experiment Batch' },
    {
      key: 'posSummary',
      label: 'POS Summary',
      render: (v) => v ? <span className="text-xs text-green-600">✓ Uploaded</span> : <span className="text-xs text-slate-400">—</span>,
    },
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
            <Button onClick={() => { setForm(defaultForm); setSubmitted(false); setItemInput(''); setValidationErrors({}); }} variant="outline">
              Log Another Order
            </Button>
          </div>
        ) : canLogOrders ? (
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
                  {validationErrors.orderId && (
                    <p className="text-xs text-red-500 mt-1">{validationErrors.orderId}</p>
                  )}
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
                  {validationErrors.quantity && (
                    <p className="text-xs text-red-500 mt-1">{validationErrors.quantity}</p>
                  )}
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                      Items Ordered *
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={itemInput}
                        onChange={(e) => setItemInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type item name and press Enter"
                        disabled={isReadOnly}
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition disabled:bg-slate-50 disabled:text-slate-400"
                      />
                      <button
                        type="button"
                        onClick={handleAddItem}
                        disabled={isReadOnly || !itemInput.trim()}
                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {form.items.map((item, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {item}
                          {!isReadOnly && (
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(index)}
                              className="ml-1 text-primary/60 hover:text-primary"
                            >
                              ×
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                    {validationErrors.items && (
                      <p className="text-xs text-red-500 mt-1">{validationErrors.items}</p>
                    )}
                  </div>
                  <FormInput
                    label="Order Time"
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                    disabled={isReadOnly}
                  />
                  {validationErrors.time && (
                    <p className="text-xs text-red-500 mt-1">{validationErrors.time}</p>
                  )}
                  <FormInput
                    label="Link Order to Experiment Batch"
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
                  {validationErrors.experimentBatch && (
                    <p className="text-xs text-red-500 mt-1">{validationErrors.experimentBatch}</p>
                  )}
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                      Upload POS Summary
                    </label>
                    <input
                      type="file"
                      name="posSummary"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      disabled={isReadOnly}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition disabled:bg-slate-50 disabled:text-slate-400"
                    />
                    {form.posSummary && (
                      <p className="text-xs text-slate-500 mt-2">
                        Selected: {form.posSummary.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {!isReadOnly && (
                <div className="flex gap-3">
                  <Button type="submit" disabled={loading} icon={ShoppingCart} variant="secondary">
                    {loading ? 'Saving...' : 'Save Order Log'}
                  </Button>
                  <Button variant="outline" type="button" onClick={() => { setForm(defaultForm); setItemInput(''); setValidationErrors({}); }}>
                    Reset Form
                  </Button>
                </div>
              )}
            </form>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
              !
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">Access Restricted</p>
              <p className="text-xs text-slate-500">{role} role does not have permission to log orders.</p>
            </div>
          </div>
        )
      ) : canViewOrders ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Recent Orders</h3>
          <p className="text-xs text-slate-400 mb-4">{orders.length} order(s) today</p>
          <Table columns={columns} data={orders} />
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
            !
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">View Access Restricted</p>
            <p className="text-xs text-slate-500">{role} role does not have permission to view order history.</p>
          </div>
        </div>
      )}
    </div>
  );
}
