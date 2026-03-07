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
  supplierBatch: '',
  expiryDate: '',
  qualityStatus: '',
  invoice: null,
  materialImage: null,
};

const UNITS = ['kg', 'g', 'L', 'mL', 'pcs', 'boxes', 'cans'];
const QUALITY_STATUSES = ['Good', 'Damaged', 'Under Inspection'];

export default function InventoryEntry({ user }) {
  const [form, setForm] = useState(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const isReadOnly = user?.role === 'Auditor';

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: '' });
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    const fieldName = e.target.name;
    
    setForm({ ...form, [fieldName]: file });
    
    if (fieldName === 'materialImage' && file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  }

  function validateForm() {
    const errors = {};
    if (!form.ingredient.trim()) errors.ingredient = 'Ingredient name is required';
    if (!form.quantity) errors.quantity = 'Quantity is required';
    if (!form.supplierBatch.trim()) errors.supplierBatch = 'Supplier batch number is required';
    if (!form.expiryDate) errors.expiryDate = 'Expiry date is required';
    if (!form.qualityStatus) errors.qualityStatus = 'Quality status is required';
    
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
        <Button onClick={() => { setForm(defaultForm); setSubmitted(false); setImagePreview(null); setValidationErrors({}); }} variant="outline">
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
              <FormInput
                label="Ingredient Name"
                name="ingredient"
                value={form.ingredient}
                onChange={handleChange}
                required
                placeholder="e.g. Black Truffle"
                disabled={isReadOnly}
              />
              {validationErrors.ingredient && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.ingredient}</p>
              )}
              <FormInput
                label="Quantity Received"
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange}
                required
                placeholder="e.g. 5"
                disabled={isReadOnly}
              />
              {validationErrors.quantity && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.quantity}</p>
              )}
              <FormInput
                label="Supplier Batch Number"
                name="supplierBatch"
                value={form.supplierBatch}
                onChange={handleChange}
                required
                placeholder="e.g. SUP-TRFL-05"
                disabled={isReadOnly}
              />
              {validationErrors.supplierBatch && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.supplierBatch}</p>
              )}
              <FormInput
                label="Expiry Date"
                name="expiryDate"
                type="date"
                value={form.expiryDate}
                onChange={handleChange}
                required
                disabled={isReadOnly}
              />
              {validationErrors.expiryDate && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.expiryDate}</p>
              )}
              <div className="md:col-span-2">
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
                {validationErrors.qualityStatus && (
                  <p className="text-xs text-red-500 mt-1">{validationErrors.qualityStatus}</p>
                )}
              </div>
            </div>
          </div>

          {/* Uploads */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-5">Supporting Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                  Upload Invoice *
                </label>
                <input
                  type="file"
                  name="invoice"
                  accept=".pdf"
                  onChange={handleFileChange}
                  disabled={isReadOnly}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition disabled:bg-slate-50 disabled:text-slate-400"
                />
                {form.invoice && (
                  <p className="text-xs text-slate-500 mt-2">
                    Selected: {form.invoice.name}
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                  Upload Material Image *
                </label>
                <input
                  type="file"
                  name="materialImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isReadOnly}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition disabled:bg-slate-50 disabled:text-slate-400"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Material Preview"
                      className="w-full h-32 object-cover rounded-lg border border-slate-200"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {!isReadOnly && (
            <div className="flex gap-3">
              <Button type="submit" disabled={loading} icon={PackagePlus} variant="success">
                {loading ? 'Saving...' : 'Submit Entry'}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => { setForm(defaultForm); setImagePreview(null); setValidationErrors({}); }}
              >
                Reset Form
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
