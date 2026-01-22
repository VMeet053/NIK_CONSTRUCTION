
import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import AdminTable from '../../components/AdminTable';
import EditModal from '../../components/EditModal';

export default function AdminClients() {
  const { clients, setClients, updateClient } = useContent(); // Note: updateClient might need to handle logo update
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const columns = [
    { key: 'name', label: 'Client Name' },
    { key: 'category', label: 'Category' },
    { key: 'logo', label: 'Logo', type: 'text' }, // Displaying emoji/text for now as per data
  ];

  const formFields = [
    { name: 'name', label: 'Client Name' },
    { name: 'category', label: 'Category' },
    { name: 'logo', label: 'Logo (Emoji or Text)' },
  ];

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentItem({});
    setIsModalOpen(true);
  };

  const handleDelete = (item) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(prev => prev.filter(c => c.id !== item.id));
    }
  };

  const handleSave = (formData) => {
    if (currentItem.id) {
      updateClient(currentItem.id, formData);
    } else {
      setClients(prev => [...prev, { ...formData, id: Date.now() }]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Clients Management</h2>
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Client
        </button>
      </div>

      <AdminTable 
        columns={columns} 
        data={clients} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        // No image change for clients as they use emojis/text in current data
      />

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        data={currentItem}
        fields={formFields}
        title={currentItem?.id ? 'Edit Client' : 'Add New Client'}
      />
    </div>
  );
}
