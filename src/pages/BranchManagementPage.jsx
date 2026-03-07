import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Power, PowerOff } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import FormInput from '../components/ui/FormInput';
import { mockBranches } from '../data/corporateAdmin';

export default function BranchManagementPage() {
  const [branches, setBranches] = useState(mockBranches);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    manager: '',
    phone: '',
    status: 'Active',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBranch = () => {
    setEditingBranch(null);
    setFormData({ name: '', location: '', manager: '', phone: '', status: 'Active' });
    setIsModalOpen(true);
  };

  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      location: branch.location,
      manager: branch.manager,
      phone: branch.phone,
      status: branch.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBranch) {
      setBranches(branches.map(b => 
        b.id === editingBranch.id 
          ? { ...b, ...formData }
          : b
      ));
    } else {
      const newBranch = {
        id: `BR-${String(branches.length + 1).padStart(3, '0')}`,
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setBranches([...branches, newBranch]);
    }
    setIsModalOpen(false);
  };

  const toggleBranchStatus = (branchId) => {
    setBranches(branches.map(b => 
      b.id === branchId 
        ? { ...b, status: b.status === 'Active' ? 'Inactive' : 'Active' }
        : b
    ));
  };

  const columns = [
    { key: 'name', label: 'Branch Name' },
    { key: 'location', label: 'Location' },
    { key: 'manager', label: 'Manager' },
    { key: 'phone', label: 'Phone' },
    { 
      key: 'status', 
      label: 'Status',
      render: (status) => <Badge label={status} variant={status === 'Active' ? 'success' : 'error'} />
    },
    { key: 'createdAt', label: 'Created Date' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, branch) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={Edit}
            onClick={() => handleEditBranch(branch)}
          >
            Edit
          </Button>
          <Button
            variant={branch.status === 'Active' ? 'danger' : 'success'}
            size="sm"
            icon={branch.status === 'Active' ? PowerOff : Power}
            onClick={() => toggleBranchStatus(branch.id)}
          >
            {branch.status === 'Active' ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Branch Management"
        subtitle="Manage restaurant branches and locations"
        actions={
          <Button icon={Plus} onClick={handleAddBranch}>
            Add Branch
          </Button>
        }
      />

      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <Table columns={columns} data={branches} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBranch ? 'Edit Branch' : 'Add New Branch'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Branch Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter branch name"
            required
          />
          
          <FormInput
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter branch location"
            required
          />
          
          <FormInput
            label="Manager"
            name="manager"
            value={formData.manager}
            onChange={handleInputChange}
            placeholder="Enter manager name"
            required
          />
          
          <FormInput
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            required
          />
          
          <FormInput
            label="Status"
            name="status"
            type="select"
            value={formData.status}
            onChange={handleInputChange}
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' },
            ]}
            required
          />
          
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingBranch ? 'Update Branch' : 'Add Branch'}
            </Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}