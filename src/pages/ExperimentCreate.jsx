import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, CheckCircle } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import FormInput from '../components/ui/FormInput';
import FileUpload from '../components/ui/FileUpload';
import Button from '../components/ui/Button';

const defaultForm = {
  name: '',
  recipeVersion: '',
  batchNumbers: '',
  temperature: '',
  cookingTime: '',
  expectedYield: '',
  expectedTexture: '',
  notes: '',
};

export default function ExperimentCreate({ user }) {
  const [form, setForm] = useState(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const isAuditor = user?.role === 'Auditor';

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  function handleReset() {
    setForm(defaultForm);
    setSubmitted(false);
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
        <h2 className="text-xl font-bold text-slate-800">Experiment Submitted!</h2>
        <p className="text-slate-500 text-sm">Your experiment has been submitted for manager review.</p>
        <Button onClick={handleReset} variant="outline">Create Another</Button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Create Experiment"
        subtitle="Submit a new recipe experiment for review and approval"
      />

      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-5 flex items-center gap-2">
              <FlaskConical size={16} className="text-primary" />
              Experiment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Experiment Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g. Spiced Lamb Rendang V4"
                disabled={isAuditor}
              />
              <FormInput
                label="Recipe Version"
                name="recipeVersion"
                value={form.recipeVersion}
                onChange={handleChange}
                required
                placeholder="e.g. v4.0"
                disabled={isAuditor}
              />
              <div className="md:col-span-2">
                <FormInput
                  label="Ingredient Batch Numbers"
                  name="batchNumbers"
                  value={form.batchNumbers}
                  onChange={handleChange}
                  required
                  placeholder="e.g. BTH-2201, BTH-2202 (comma separated)"
                  disabled={isAuditor}
                />
              </div>
            </div>
          </div>

          {/* Process Parameters */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-5">Process Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Temperature (°C)"
                name="temperature"
                type="number"
                value={form.temperature}
                onChange={handleChange}
                required
                placeholder="e.g. 180"
                disabled={isAuditor}
              />
              <FormInput
                label="Cooking Time (minutes)"
                name="cookingTime"
                type="number"
                value={form.cookingTime}
                onChange={handleChange}
                required
                placeholder="e.g. 240"
                disabled={isAuditor}
              />
              <FormInput
                label="Expected Yield"
                name="expectedYield"
                value={form.expectedYield}
                onChange={handleChange}
                required
                placeholder="e.g. 15kg"
                disabled={isAuditor}
              />
              <FormInput
                label="Expected Texture"
                name="expectedTexture"
                value={form.expectedTexture}
                onChange={handleChange}
                required
                placeholder="e.g. Tender, pull-apart"
                disabled={isAuditor}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-5">Chef Notes</h3>
            <FormInput
              label="Additional Notes"
              name="notes"
              type="textarea"
              value={form.notes}
              onChange={handleChange}
              placeholder="Describe preparation technique, observations, variations tried..."
              rows={4}
              disabled={isAuditor}
            />
          </div>

          {/* Uploads */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-5">Attachments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FileUpload
                label="Dish Image"
                accept="image/*"
                name="dishImage"
                disabled={isAuditor}
              />
              <FileUpload
                label="Cooking Logs (PDF / DOCX)"
                accept=".pdf,.doc,.docx"
                name="cookingLogs"
                disabled={isAuditor}
              />
            </div>
          </div>

          {/* Chef info strip */}
          <div className="bg-primary-light border border-primary/20 rounded-xl px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
              {user?.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-primary-text">{user?.name}</p>
              <p className="text-xs text-primary/60">{user?.role} · {user?.department}</p>
            </div>
          </div>

          {!isAuditor && (
            <div className="flex gap-3">
              <Button type="submit" disabled={loading} icon={FlaskConical}>
                {loading ? 'Submitting...' : 'Submit Experiment'}
              </Button>
              <Button variant="outline" onClick={handleReset} type="button">
                Clear Form
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
