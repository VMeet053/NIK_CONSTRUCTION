
import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import AdminTable from '../../components/AdminTable';
import EditModal from '../../components/EditModal';
import AdminPageHeader from '../../components/AdminPageHeader';

export default function AdminClients() {
  const { clients, setClients, updateClient } = useContent(); // Note: updateClient might need to handle logo update
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const columns = [
    { key: 'name', label: 'Client Name' },
    { key: 'category', label: 'Category' },
    { 
      key: 'logo', 
      label: 'Logo', 
      render: (value) => {
        const isImage = value && (String(value).startsWith('http') || String(value).startsWith('data:image'));
        if (isImage) {
          return (
            <div className="relative h-12 w-16 overflow-hidden rounded-lg shadow-sm border border-gray-200 bg-gray-50 flex items-center justify-center">
              <img src={value} alt="Logo" className="max-h-full max-w-full object-contain" />
            </div>
          );
        }
        return <span className="text-2xl">{value}</span>;
      }
    },
  ];

  const formFields = [
    { name: 'name', label: 'Client Name' },
    { name: 'category', label: 'Category' },
    { name: 'logo', label: 'Logo (Image or Text)', type: 'image' },
  ];

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentItem({});
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (await confirm({
      title: 'Delete Client',
      message: 'Are you sure you want to delete this client?'
    })) {
      try {
        setClients(prev => prev.filter(c => c.id !== item.id));
        showToast('Client deleted successfully', 'success');
      } catch (error) {
        showToast('Failed to delete client', 'error');
      }
    }
  };

  const handleSave = (formData) => {
    try {
      if (currentItem.id) {
        updateClient(currentItem.id, formData);
        showToast('Client updated successfully', 'success');
      } else {
        setClients(prev => [...prev, { ...formData, id: Date.now() }]);
        showToast('Client created successfully', 'success');
      }
    } catch (error) {
      showToast('Failed to save client', 'error');
    }
  };

  const categories = [...new Set(clients.map(c => c.category))].filter(Boolean);

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Clients Management" 
        stats={`${clients.length} Clients`}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
      >
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-md font-bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Client
        </button>
      </AdminPageHeader>

      <AdminTable 
        columns={columns} 
        data={clients} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        // No image change for clients as they use emojis/text in current data
        searchable={true}
        filters={[
          { key: 'category', label: 'Category', options: categories }
        ]}
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
