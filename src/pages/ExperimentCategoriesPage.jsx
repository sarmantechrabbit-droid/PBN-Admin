import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import FormInput from '../components/ui/FormInput';
import { mockExperimentCategories } from '../data/corporateAdmin';

export default function ExperimentCategoriesPage() {
  const [categories, setCategories] = useState(mockExperimentCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '' });
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(categories.map(c => 
        c.id === editingCategory.id 
          ? { ...c, ...formData }
          : c
      ));
    } else {
      const newCategory = {
        id: `CAT-${String(categories.length + 1).padStart(3, '0')}`,
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        experimentsCount: 0,
      };
      setCategories([...categories, newCategory]);
    }
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'name', label: 'Category Name' },
    { key: 'description', label: 'Description' },
    { 
      key: 'experimentsCount', 
      label: 'Experiments',
      render: (count) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary-text">
          {count}
        </span>
      )
    },
    { key: 'createdAt', label: 'Created Date' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Experiment Categories"
        subtitle="Manage experiment categories and classifications"
      />

      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <Table columns={columns} data={categories} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter category name"
            required
          />
          
          <FormInput
            label="Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter category description"
            rows={3}
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
              {editingCategory ? 'Update Category' : 'Add Category'}
            </Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}