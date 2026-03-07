import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';
import Button from './Button';
import FormInput from './FormInput';

export default function ReviewerApprovalModal({ experiment, isOpen, onClose, onApprove, onReject }) {
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleApprove() {
    if (!remarks.trim()) {
      alert('Please add reviewer remarks before approving.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    onApprove(experiment.id, remarks);
    setLoading(false);
    setRemarks('');
    onClose();
  }

  async function handleReject() {
    if (!remarks.trim()) {
      alert('Please add reviewer remarks before rejecting.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    onReject(experiment.id, remarks);
    setLoading(false);
    setRemarks('');
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Quality Review</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
            >
              <X size={16} className="text-slate-600" />
            </button>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-slate-800 mb-2">{experiment?.name}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Experiment ID</p>
                <p className="font-medium">{experiment?.id}</p>
              </div>
              <div>
                <p className="text-slate-500">Chef</p>
                <p className="font-medium">{experiment?.chef}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <FormInput
              label="Reviewer Remarks *"
              name="remarks"
              type="textarea"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add your review comments..."
              rows={4}
              required
            />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleApprove}
              disabled={loading || !remarks.trim()}
              icon={CheckCircle}
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1"
            >
              {loading ? 'Processing...' : 'Approve'}
            </Button>
            <Button
              onClick={handleReject}
              disabled={loading || !remarks.trim()}
              icon={XCircle}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 flex-1"
            >
              {loading ? 'Processing...' : 'Reject'}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}