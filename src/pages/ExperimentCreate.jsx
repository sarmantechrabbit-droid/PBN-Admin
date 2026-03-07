import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, CheckCircle, Save } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import FormInput from '../components/ui/FormInput';
import FileUpload from '../components/ui/FileUpload';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { canPerformAction, getRoleRestrictions } from '../utils/rolePermissions';

const defaultForm = {
  name: '',
  recipeVersion: '',
  batchNumbers: '',
  temperature: '',
  cookingTime: '',
  expectedYield: '',
  expectedTexture: '',
  expectedTasteScore: '',
  actualYield: '',
  actualTasteScore: '',
  notes: '',
  dishImage: null,
  processLogs: null,
  status: 'Draft',
};

export default function ExperimentCreate({ user }) {
  const [form, setForm] = useState(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const role = user?.role;
  const restrictions = getRoleRestrictions(role);
  const isReadOnly = restrictions.readOnly || role === 'CRA Auditor';
  const isSubmitted = form.status === 'Submitted';
  const canModify = canPerformAction(role, 'canModifyExperiment');
  const cannotModifyAfterSubmission = restrictions.cannotModifyAfterSubmission && isSubmitted;
  const isDisabled = isReadOnly || cannotModifyAfterSubmission;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear validation error when user starts typing
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: '' });
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    const fieldName = e.target.name;
    
    setForm({ ...form, [fieldName]: file });
    
    // Create image preview for dish images
    if (fieldName === 'dishImage' && file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  }

  function handleSaveDraft() {
    setForm({ ...form, status: 'Draft' });
    alert('Draft saved successfully!');
  }

  function handleSubmitForReview() {
    if (!validateForm()) return;
    setForm({ ...form, status: 'Submitted' });
    setSubmitted(true);
  }

  function validateForm() {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Experiment name is required';
    if (!form.recipeVersion.trim()) errors.recipeVersion = 'Recipe version is required';
    if (!form.batchNumbers.trim()) errors.batchNumbers = 'Batch numbers are required';
    if (!form.temperature) errors.temperature = 'Temperature is required';
    if (!form.cookingTime) errors.cookingTime = 'Cooking time is required';
    if (!form.expectedYield.trim()) errors.expectedYield = 'Expected yield is required';
    if (!form.expectedTasteScore) errors.expectedTasteScore = 'Expected taste score is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    handleSubmitForReview();
  }

  function handleReset() {
    setForm(defaultForm);
    setSubmitted(false);
    setImagePreview(null);
    setValidationErrors({});
  }

  function getStatusBadgeVariant(status) {
    switch (status) {
      case 'Draft': return 'secondary';
      case 'Submitted': return 'warning';
      case 'Approved': return 'success';
      case 'Rejected': return 'danger';
      default: return 'secondary';
    }
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

      {/* Status Badge */}
      <div className="mb-6">
        <Badge variant={getStatusBadgeVariant(form.status)}>
          {form.status}
        </Badge>
      </div>

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
                disabled={isDisabled}
              />
              {validationErrors.name && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.name}</p>
              )}
              <FormInput
                label="Recipe Version"
                name="recipeVersion"
                value={form.recipeVersion}
                onChange={handleChange}
                required
                placeholder="e.g. v4.0"
                disabled={isDisabled}
              />
              {validationErrors.recipeVersion && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.recipeVersion}</p>
              )}
              <div className="md:col-span-2">
                <FormInput
                  label="Ingredient Batch Numbers"
                  name="batchNumbers"
                  value={form.batchNumbers}
                  onChange={handleChange}
                  required
                  placeholder="e.g. BTH-2201, BTH-2202 (comma separated)"
                  disabled={isDisabled}
                />
                {validationErrors.batchNumbers && (
                  <p className="text-xs text-red-500 mt-1">{validationErrors.batchNumbers}</p>
                )}
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
                disabled={isDisabled}
              />
              {validationErrors.temperature && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.temperature}</p>
              )}
              <FormInput
                label="Cooking Time (minutes)"
                name="cookingTime"
                type="number"
                value={form.cookingTime}
                onChange={handleChange}
                required
                placeholder="e.g. 240"
                disabled={isDisabled}
              />
              {validationErrors.cookingTime && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.cookingTime}</p>
              )}
              <FormInput
                label="Expected Yield"
                name="expectedYield"
                value={form.expectedYield}
                onChange={handleChange}
                required
                placeholder="e.g. 15kg"
                disabled={isDisabled}
              />
              {validationErrors.expectedYield && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.expectedYield}</p>
              )}
              <FormInput
                label="Expected Taste Score (1-10)"
                name="expectedTasteScore"
                type="number"
                min="1"
                max="10"
                value={form.expectedTasteScore}
                onChange={handleChange}
                required
                placeholder="e.g. 8"
                disabled={isDisabled}
              />
              {validationErrors.expectedTasteScore && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.expectedTasteScore}</p>
              )}
              <FormInput
                label="Expected Texture"
                name="expectedTexture"
                type="select"
                value={form.expectedTexture}
                onChange={handleChange}
                required
                disabled={isDisabled}
                options={[
                  { value: 'Soft', label: 'Soft' },
                  { value: 'Medium', label: 'Medium' },
                  { value: 'Crispy', label: 'Crispy' },
                  { value: 'Dense', label: 'Dense' },
                ]}
              />
              {validationErrors.expectedTexture && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.expectedTexture}</p>
              )}
            </div>
          </div>

          {/* Actual Output Fields */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-5">Actual Output</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Actual Yield"
                name="actualYield"
                value={form.actualYield}
                onChange={handleChange}
                placeholder="e.g. 14.5kg"
                disabled={isDisabled}
              />
              <FormInput
                label="Actual Taste Score (1-10)"
                name="actualTasteScore"
                type="number"
                min="1"
                max="10"
                value={form.actualTasteScore}
                onChange={handleChange}
                placeholder="e.g. 7"
                disabled={isDisabled}
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
              disabled={isDisabled}
            />
          </div>

          {/* Uploads */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-5">Attachments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                  Upload Dish Images *
                </label>
                <input
                  type="file"
                  name="dishImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isDisabled}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition disabled:bg-slate-50 disabled:text-slate-400"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg border border-slate-200"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                  Upload Process Logs
                </label>
                <input
                  type="file"
                  name="processLogs"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  disabled={isDisabled}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition disabled:bg-slate-50 disabled:text-slate-400"
                />
                {form.processLogs && (
                  <p className="text-xs text-slate-500 mt-2">
                    Selected: {form.processLogs.name}
                  </p>
                )}
              </div>
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

          {!isReadOnly && !cannotModifyAfterSubmission && (
            <div className="flex gap-3">
              <Button onClick={handleSaveDraft} variant="outline" icon={Save}>
                Save Draft
              </Button>
              <Button type="submit" disabled={loading} icon={FlaskConical}>
                {loading ? 'Submitting...' : 'Submit for Review'}
              </Button>
              <Button variant="outline" onClick={handleReset} type="button">
                Reset Form
              </Button>
            </div>
          )}

          {/* Role-based restrictions notice */}
          {isReadOnly && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
                !
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">Read-Only Mode</p>
                <p className="text-xs text-slate-500">{role} role has read-only access to experiments.</p>
              </div>
            </div>
          )}

          {cannotModifyAfterSubmission && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 text-xs font-bold">
                !
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-700">Experiment Locked</p>
                <p className="text-xs text-amber-600">Cannot modify experiment after submission. Contact Quality Reviewer for changes.</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
