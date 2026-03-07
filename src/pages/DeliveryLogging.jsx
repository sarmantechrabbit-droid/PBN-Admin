import { useState } from 'react';
import { Truck, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import FormInput from '../components/ui/FormInput';
import FileUpload from '../components/ui/FileUpload';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import { deliveries } from '../data/deliveries';
import { canPerformAction, getRoleRestrictions } from '../utils/rolePermissions';

const defaultForm = {
  deliveryId: '',
  distance: '',
  route: '',
  deliveryTime: '',
  fuelConsumption: '',
  routeScreenshot: null,
};

export default function DeliveryLogging({ user }) {
  const [form, setForm] = useState(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('log');

  const role = user?.role;
  const restrictions = getRoleRestrictions(role);
  const isReadOnly = restrictions.readOnly || role === 'CRA Auditor';
  const canLogDeliveries = canPerformAction(role, 'canLogDeliveries');
  const canViewDeliveries = canPerformAction(role, 'canViewDeliveries');

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
    { key: 'id', label: 'Delivery ID' },
    {
      key: 'distance',
      label: 'Distance (km)',
      render: (v) => `${v} km`,
    },
    { key: 'route', label: 'Route', render: (v) => <span className="text-xs">{v}</span> },
    { key: 'deliveryTime', label: 'Delivery Time' },
    {
      key: 'fuelConsumption',
      label: 'Fuel Consumption (L)',
      render: (v) => `${v}L`,
    },
    {
      key: 'screenshot',
      label: 'Screenshot',
      render: (v) => v ? '✓ Uploaded' : '—',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Delivery Logging"
        subtitle="Record delivery routes, fuel usage, and delivery status"
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
            {tab === 'log' ? 'Log Delivery' : 'Delivery History'}
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
            <h2 className="text-xl font-bold text-slate-800">Delivery Logged!</h2>
            <p className="text-slate-500 text-sm">Delivery record saved successfully.</p>
            <Button onClick={() => { setForm(defaultForm); setSubmitted(false); }} variant="outline">
              Log Another Delivery
            </Button>
          </div>
        ) : canLogDeliveries ? (
          <div className="max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-5 flex items-center gap-2">
                  <Truck size={16} className="text-secondary" />
                  Delivery Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormInput
                    label="Delivery ID"
                    name="deliveryId"
                    value={form.deliveryId}
                    onChange={handleChange}
                    required
                    placeholder="e.g. DEL-507"
                    disabled={isReadOnly}
                  />
                  <FormInput
                    label="Distance (km)"
                    name="distance"
                    type="number"
                    step="0.1"
                    value={form.distance}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 12.4"
                    disabled={isReadOnly}
                  />
                  <div className="md:col-span-2">
                    <FormInput
                      label="Route"
                      name="route"
                      value={form.route}
                      onChange={handleChange}
                      required
                      placeholder="e.g. HQ → Gulshan → Banani → HQ"
                      disabled={isReadOnly}
                    />
                  </div>
                  <FormInput
                    label="Delivery Time"
                    name="deliveryTime"
                    type="time"
                    value={form.deliveryTime}
                    onChange={handleChange}
                    required
                    disabled={isReadOnly}
                  />
                  <FormInput
                    label="Fuel Consumption (L)"
                    name="fuelConsumption"
                    type="number"
                    step="0.1"
                    value={form.fuelConsumption}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 2.1"
                    disabled={isReadOnly}
                  />
                </div>
              </div>

              {/* Route screenshot upload */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-5">Route Evidence</h3>
                <FileUpload
                  label="Route Screenshot (PNG / JPG)"
                  accept="image/*"
                  name="routeScreenshot"
                  disabled={isReadOnly}
                />
              </div>

              {!isReadOnly && (
                <div className="flex gap-3">
                  <Button type="submit" disabled={loading} icon={Truck} variant="secondary">
                    {loading ? 'Saving...' : 'Log Delivery'}
                  </Button>
                  <Button variant="outline" type="button" onClick={() => setForm(defaultForm)}>
                    Clear
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
              <p className="text-xs text-slate-500">{role} role does not have permission to log deliveries.</p>
            </div>
          </div>
        )
      ) : canViewDeliveries ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <p className="text-xs text-slate-400 mb-4">{deliveries.length} delivery record(s)</p>
          <Table columns={columns} data={deliveries} />
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
            !
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">View Access Restricted</p>
            <p className="text-xs text-slate-500">{role} role does not have permission to view delivery history.</p>
          </div>
        </div>
      )}
    </div>
  );
}
