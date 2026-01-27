
import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import AdminTable from '../../components/AdminTable';
import EditModal from '../../components/EditModal';
import AdminPageHeader from '../../components/AdminPageHeader';

export default function AdminServices() {
  const { services, addService, updateService, deleteService, updateImage } = useContent();
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const columns = [
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'title', label: 'Service Title' },
    { key: 'description', label: 'Description' },
  ];

  const formFields = [
    { name: 'title', label: 'Title' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'iconType', label: 'Icon Type (optional)' },
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
      title: 'Delete Service',
      message: 'Are you sure you want to delete this service?'
    })) {
      try {
        deleteService(item.id);
        showToast('Service deleted successfully', 'success');
      } catch (error) {
        showToast('Failed to delete service', 'error');
      }
    }
  };

  const handleSave = (formData) => {
    try {
      if (currentItem.id) {
        updateService(currentItem.id, formData);
        showToast('Service updated successfully', 'success');
      } else {
        addService({
          ...formData,
          image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=800' // Default image
        });
        showToast('Service created successfully', 'success');
      }
    } catch (error) {
      showToast('Failed to save service', 'error');
    }
  };

  const handleImageChange = (item) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          try {
            updateImage('services', item.id, reader.result);
            showToast('Image updated successfully', 'success');
          } catch (error) {
            showToast('Failed to update image', 'error');
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Services Management" 
        stats={`${services.length} Services Offered`}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
      >
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-md font-bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Service
        </button>
      </AdminPageHeader>

      <AdminTable 
        columns={columns} 
        data={services} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        onImageChange={handleImageChange}
        searchable={true}
      />

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        data={currentItem}
        fields={formFields}
        title={currentItem?.id ? 'Edit Service' : 'Add New Service'}
      />
    </div>
  );
}
