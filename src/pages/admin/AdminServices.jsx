
import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import AdminTable from '../../components/AdminTable';
import EditModal from '../../components/EditModal';

export default function AdminServices() {
  const { services, addService, updateService, deleteService, updateImage } = useContent();
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

  const handleDelete = (item) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteService(item.id);
    }
  };

  const handleSave = (formData) => {
    if (currentItem.id) {
      updateService(currentItem.id, formData);
    } else {
      addService({
        ...formData,
        image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=800' // Default image
      });
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
          updateImage('services', item.id, reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Services Management</h2>
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Service
        </button>
      </div>

      <AdminTable 
        columns={columns} 
        data={services} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        onImageChange={handleImageChange}
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
