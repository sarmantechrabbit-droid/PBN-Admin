import { useState } from 'react';
import { Star, MessageSquare, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import { canPerformAction, getRoleRestrictions } from '../utils/rolePermissions';

const defaultForm = {
  orderId: '',
  rating: '',
  tasteScore: '',
  textureScore: '',
  complaintType: '',
};

const complaintOptions = [
  'None',
  'Taste Issue',
  'Texture Issue',
  'Late Delivery',
  'Wrong Item',
  'Other'
];

const dummyFeedback = [
  {
    orderId: 'ORD-001',
    rating: 5,
    tasteScore: 9,
    textureScore: 8,
    complaintType: 'None',
    date: '2025-12-14'
  },
  {
    orderId: 'ORD-002',
    rating: 3,
    tasteScore: 6,
    textureScore: 5,
    complaintType: 'Taste Issue',
    date: '2025-12-14'
  },
  {
    orderId: 'ORD-003',
    rating: 4,
    tasteScore: 8,
    textureScore: 7,
    complaintType: 'Late Delivery',
    date: '2025-12-13'
  },
  {
    orderId: 'ORD-004',
    rating: 5,
    tasteScore: 10,
    textureScore: 9,
    complaintType: 'None',
    date: '2025-12-13'
  },
  {
    orderId: 'ORD-005',
    rating: 2,
    tasteScore: 4,
    textureScore: 3,
    complaintType: 'Wrong Item',
    date: '2025-12-12'
  }
];

export default function CustomerFeedback({ user }) {
  const [form, setForm] = useState(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedbackData, setFeedbackData] = useState(dummyFeedback);

  const role = user?.role;
  const restrictions = getRoleRestrictions(role);
  const isReadOnly = restrictions.readOnly || role === 'CRA Auditor';
  const canCreateFeedback = canPerformAction(role, 'canCreateCustomerFeedback');
  const canViewFeedback = canPerformAction(role, 'canViewCustomerFeedback');
  const canDeleteFeedback = !restrictions.cannotDeleteFeedback;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleRatingClick(rating) {
    if (!isReadOnly) {
      setForm({ ...form, rating: rating.toString() });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    
    const newFeedback = {
      ...form,
      rating: parseInt(form.rating),
      tasteScore: parseInt(form.tasteScore),
      textureScore: parseInt(form.textureScore),
      date: new Date().toISOString().split('T')[0]
    };
    
    setFeedbackData([newFeedback, ...feedbackData]);
    setLoading(false);
    setSubmitted(true);
  }

  function handleReset() {
    setForm(defaultForm);
  }

  const columns = [
    { key: 'orderId', label: 'Order ID' },
    { 
      key: 'rating', 
      label: 'Rating',
      render: (v) => (
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={14}
              className={star <= v ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}
            />
          ))}
        </div>
      )
    },
    { key: 'tasteScore', label: 'Taste Score', render: (v) => `${v}/10` },
    { key: 'textureScore', label: 'Texture Score', render: (v) => `${v}/10` },
    { key: 'complaintType', label: 'Complaint Type' },
    { key: 'date', label: 'Date' }
  ];

  if (submitted) {
    return (
      <div>
        <PageHeader
          title="Customer Feedback"
          subtitle="Collect and analyze customer feedback on orders"
        />
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <CheckCircle size={64} className="text-emerald-500" />
          </motion.div>
          <h2 className="text-xl font-bold text-slate-800">Feedback Submitted!</h2>
          <p className="text-slate-500 text-sm">Thank you for your feedback.</p>
          <Button onClick={() => { setForm(defaultForm); setSubmitted(false); }} variant="outline">
            Submit Another Feedback
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Customer Feedback"
        subtitle="Collect and analyze customer feedback on orders"
      />

      {/* Feedback Form */}
      <div className="max-w-4xl mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-5 flex items-center gap-2">
              <MessageSquare size={16} className="text-secondary" />
              Customer Feedback Form
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Order ID"
                name="orderId"
                value={form.orderId}
                onChange={handleChange}
                required
                placeholder="e.g. ORD-001"
                disabled={isReadOnly}
              />

              {/* Star Rating */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Rating (1-5 stars) <span className="text-red-400">*</span>
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      disabled={isReadOnly}
                      className="p-1 hover:scale-110 transition-transform disabled:cursor-not-allowed"
                    >
                      <Star
                        size={24}
                        className={
                          star <= parseInt(form.rating || 0)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 hover:text-amber-200'
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <FormInput
                label="Taste Score (1-10)"
                name="tasteScore"
                type="number"
                min="1"
                max="10"
                value={form.tasteScore}
                onChange={handleChange}
                required
                placeholder="e.g. 8"
                disabled={isReadOnly}
              />

              <FormInput
                label="Texture Score (1-10)"
                name="textureScore"
                type="number"
                min="1"
                max="10"
                value={form.textureScore}
                onChange={handleChange}
                required
                placeholder="e.g. 7"
                disabled={isReadOnly}
              />

              <div className="md:col-span-2">
                <FormInput
                  label="Complaint Type"
                  name="complaintType"
                  type="select"
                  value={form.complaintType}
                  onChange={handleChange}
                  required
                  options={complaintOptions}
                  disabled={isReadOnly}
                />
              </div>
            </div>
          </div>

          {canCreateFeedback && !isReadOnly && (
            <div className="flex gap-3">
              <Button type="submit" disabled={loading} icon={MessageSquare}>
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </Button>
              <Button variant="outline" type="button" onClick={handleReset}>
                Reset
              </Button>
            </div>
          )}

          {/* Role-based restrictions notice */}
          {!canCreateFeedback && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
                !
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">View-Only Access</p>
                <p className="text-xs text-slate-500">{role} role can only view feedback records.</p>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Feedback History Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Feedback History</h3>
        <p className="text-xs text-slate-400 mb-4">{feedbackData.length} feedback record(s)</p>
        <Table columns={columns} data={feedbackData} />
      </div>
    </div>
  );
}