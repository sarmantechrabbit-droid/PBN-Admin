import { useState } from 'react';
import { PackagePlus, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import FormInput from '../components/ui/FormInput';
import FileUpload from '../components/ui/FileUpload';
import Button from '../components/ui/Button';

const defaultForm = {
  ingredient: '',
  quantity: '',
  unit: '',
  supplierBatch: '',
  expiryDate: '',
  qualityStatus: '',
  supplier: '',
};

const UNITS = ['kg', 'g', 'L', 'mL', 'pcs', 'boxes', 'cans'];
const QUALITY_STATUSES = ['Good', 'Expiring Soon', 'Damaged', 'Under Inspection'];

export default function InventoryEntry({ user }) {
  const [form, setForm] = useState(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <CheckCircle size={64} className="text-emerald-500" />
        </motion.div>
        <h2 className="text-xl font-bold text-slate-800">Inventory Added!</h2>
        <p className="text-slate-500 text-sm">Stock entry has been recorded successfully.</p>
        <Button onClick={() => { setForm(defaultForm); setSubmitted(false); }} variant="outline">
          Add Another Item
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Inventory Entry"
        subtitle="Log new stock arrivals and ingredient batches"
      />

      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ingredient Details */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-5 flex items-center gap-2">
              <PackagePlus size={16} className="text-emerald-600" />
              Ingredient Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <FormInput
                  label="Ingredient Name"
                  name="ingredient"
                  value={form.ingredient}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Black Truffle"
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
                placeholder="e.g. 5"
                disabled={isReadOnly}
              />
              <FormInput
                label="Unit"
                name="unit"
                type="select"
                value={form.unit}
                onChange={handleChange}
                required
                options={UNITS}
                disabled={isReadOnly}
              />
              <FormInput
                label="Supplier"
                name="supplier"
                value={form.supplier}
                onChange={handleChange}
                required
                placeholder="e.g. Luxe Pantry Imports"
                disabled={isReadOnly}
              />
              <FormInput
                label="Supplier Batch Number"
                name="supplierBatch"
                value={form.supplierBatch}
                onChange={handleChange}
                required
                placeholder="e.g. SUP-TRFL-05"
                disabled={isReadOnly}
              />
              <FormInput
                label="Expiry Date"
                name="expiryDate"
                type="date"
                value={form.expiryDate}
                onChange={handleChange}
                required
                disabled={isReadOnly}
              />
              <FormInput
                label="Quality Status"
                name="qualityStatus"
                type="select"
                value={form.qualityStatus}
                onChange={handleChange}
                required
                options={QUALITY_STATUSES}
                disabled={isReadOnly}
              />
            </div>
          </div>

          {/* Uploads */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-5">Supporting Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FileUpload
                label="Supplier Invoice (PDF)"
                accept=".pdf"
                name="invoice"
                disabled={isReadOnly}
              />
              <FileUpload
                label="Material / Item Image"
                accept="image/*"
                name="materialImage"
                disabled={isReadOnly}
              />
            </div>
          </div>

          {!isReadOnly && (
            <div className="flex gap-3">
              <Button type="submit" disabled={loading} icon={PackagePlus} variant="success">
                {loading ? 'Saving...' : 'Add to Inventory'}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => setForm(defaultForm)}
              >
                Clear Form
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
