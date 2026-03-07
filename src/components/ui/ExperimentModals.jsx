import { useState } from 'react';
import { X } from 'lucide-react';
import Button from './Button';
import FormInput from './FormInput';
import { chefs, reviewers } from '../../data/staff';

export function AssignChefModal({ isOpen, onClose, experiment, onSave }) {
  const [selectedChef, setSelectedChef] = useState(experiment?.assignedChef || '');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(experiment.id, { assignedChef: selectedChef });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Assign Chef</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-slate-600 mb-3">
            Experiment: <span className="font-medium">{experiment?.name}</span>
          </p>
          
          <FormInput
            label="Select Chef"
            type="select"
            value={selectedChef}
            onChange={(e) => setSelectedChef(e.target.value)}
            options={chefs.map(chef => ({ value: chef.name, label: chef.name }))}
            required
          />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!selectedChef} className="flex-1">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export function AssignReviewerModal({ isOpen, onClose, experiment, onSave }) {
  const [selectedReviewer, setSelectedReviewer] = useState(experiment?.assignedReviewer || '');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(experiment.id, { assignedReviewer: selectedReviewer });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Assign Reviewer</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-slate-600 mb-3">
            Experiment: <span className="font-medium">{experiment?.name}</span>
          </p>
          
          <FormInput
            label="Select Reviewer"
            type="select"
            value={selectedReviewer}
            onChange={(e) => setSelectedReviewer(e.target.value)}
            options={reviewers.map(reviewer => ({ value: reviewer.name, label: reviewer.name }))}
            required
          />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!selectedReviewer} className="flex-1">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ConfigureMetadataModal({ isOpen, onClose, experiment, onSave }) {
  const [metadata, setMetadata] = useState({
    batchId: experiment?.batchId || '',
    temperatureLog: experiment?.temperatureLog || '',
    ingredientLotNumber: experiment?.ingredientLotNumber || '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMetadata(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(experiment.id, metadata);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Configure Metadata</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-slate-600 mb-4">
            Experiment: <span className="font-medium">{experiment?.name}</span>
          </p>
          
          <div className="space-y-4">
            <FormInput
              label="Batch ID"
              name="batchId"
              value={metadata.batchId}
              onChange={handleChange}
              placeholder="e.g., BATCH-001"
            />
            
            <FormInput
              label="Temperature Log"
              name="temperatureLog"
              type="number"
              value={metadata.temperatureLog}
              onChange={handleChange}
              placeholder="e.g., 180"
            />
            
            <FormInput
              label="Ingredient Lot Number"
              name="ingredientLotNumber"
              value={metadata.ingredientLotNumber}
              onChange={handleChange}
              placeholder="e.g., LOT-2024-001"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Save Metadata
          </Button>
        </div>
      </div>
    </div>
  );
}