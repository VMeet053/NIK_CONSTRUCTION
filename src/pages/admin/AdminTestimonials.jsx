
import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import AdminTable from '../../components/AdminTable';
import EditModal from '../../components/EditModal';
import AdminPageHeader from '../../components/AdminPageHeader';

export default function AdminTestimonials() {
  const { testimonials, setTestimonials, updateTestimonial, updateImage } = useContent();
  const { showToast } = useToast();
  const { confirm } = useConfirm();
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

  const handleDelete = async (item) => {
    if (await confirm({
      title: 'Delete Testimonial',
      message: 'Are you sure you want to delete this testimonial?'
    })) {
      try {
        setTestimonials(prev => prev.filter(t => t.id !== item.id));
        showToast('Testimonial deleted successfully', 'success');
      } catch (error) {
        showToast('Failed to delete testimonial', 'error');
      }
    }
  };

  const handleSave = (formData) => {
    try {
      if (currentItem.id) {
        updateTestimonial(currentItem.id, formData);
        showToast('Testimonial updated successfully', 'success');
      } else {
        setTestimonials(prev => [...prev, {
          ...formData,
          id: Date.now(),
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' // Default
        }]);
        showToast('Testimonial created successfully', 'success');
      }
    } catch (error) {
      showToast('Failed to save testimonial', 'error');
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
            updateImage('testimonials', item.id, reader.result);
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
        title="Testimonials Management" 
        stats={`${testimonials.length} Testimonials`}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
      >
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-md font-bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Testimonial
        </button>
      </AdminPageHeader>

      <AdminTable 
        columns={columns} 
        data={testimonials} 
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
        title={currentItem?.id ? 'Edit Testimonial' : 'Add New Testimonial'}
      />
    </div>
  );
}
