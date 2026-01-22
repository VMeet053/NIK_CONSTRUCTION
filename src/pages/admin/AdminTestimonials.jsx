
import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import AdminTable from '../../components/AdminTable';
import EditModal from '../../components/EditModal';

export default function AdminTestimonials() {
  const { testimonials, setTestimonials, updateTestimonial, updateImage } = useContent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const columns = [
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'location', label: 'Location' },
    { key: 'rating', label: 'Rating' },
  ];

  const formFields = [
    { name: 'name', label: 'Name' },
    { name: 'role', label: 'Role' },
    { name: 'location', label: 'Location' },
    { name: 'quote', label: 'Quote', type: 'textarea' },
    { name: 'rating', label: 'Rating (1-5)', type: 'number' },
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
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials(prev => prev.filter(t => t.id !== item.id));
    }
  };

  const handleSave = (formData) => {
    if (currentItem.id) {
      updateTestimonial(currentItem.id, formData);
    } else {
      setTestimonials(prev => [...prev, {
        ...formData,
        id: Date.now(),
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' // Default
      }]);
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
          updateImage('testimonials', item.id, reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Testimonials Management</h2>
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Testimonial
        </button>
      </div>

      <AdminTable 
        columns={columns} 
        data={testimonials} 
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
        title={currentItem?.id ? 'Edit Testimonial' : 'Add New Testimonial'}
      />
    </div>
  );
}
