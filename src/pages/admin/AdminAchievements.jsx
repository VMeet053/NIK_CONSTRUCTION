
import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import AdminTable from '../../components/AdminTable';
import EditModal from '../../components/EditModal';
import AdminPageHeader from '../../components/AdminPageHeader';

export default function AdminAchievements() {
  const { awards, setAwards, updateImage } = useContent();
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const columns = [
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'title', label: 'Award Title' },
    { key: 'category', label: 'Category' },
    { key: 'year', label: 'Year' },
    { key: 'issuer', label: 'Issuer' },
  ];

  const formFields = [
    { name: 'title', label: 'Title' },
    { name: 'category', label: 'Category' },
    { name: 'year', label: 'Year' },
    { name: 'issuer', label: 'Issuer' },
    { name: 'project', label: 'Associated Project' },
    { name: 'location', label: 'Location' },
    { name: 'citation', label: 'Citation', type: 'textarea' },
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
      title: 'Delete Achievement',
      message: 'Are you sure you want to delete this achievement?'
    })) {
      try {
        setAwards(prev => prev.filter(a => a.id !== item.id));
        showToast('Achievement deleted successfully', 'success');
      } catch (error) {
        showToast('Failed to delete achievement', 'error');
      }
    }
  };

  const handleSave = (formData) => {
    try {
      if (currentItem.id) {
        setAwards(prev => prev.map(a => a.id === currentItem.id ? { ...a, ...formData } : a));
        showToast('Achievement updated successfully', 'success');
      } else {
        setAwards(prev => [...prev, {
          ...formData,
          id: Date.now(),
          image: 'https://images.unsplash.com/photo-1562916132-841bc6c47866?w=800' // Default
        }]);
        showToast('Achievement created successfully', 'success');
      }
    } catch (error) {
      showToast('Failed to save achievement', 'error');
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
            updateImage('awards', item.id, reader.result);
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

  const categories = [...new Set(awards.map(a => a.category))].filter(Boolean);
  const years = [...new Set(awards.map(a => a.year))].filter(Boolean).sort().reverse();

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Achievements Management" 
        stats={`${awards.length} Awards Won`}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
      >
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-md font-bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Achievement
        </button>
      </AdminPageHeader>

      <AdminTable 
        columns={columns} 
        data={awards} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        onImageChange={handleImageChange}
        searchable={true}
        filters={[
          { key: 'category', label: 'Category', options: categories },
          { key: 'year', label: 'Year', options: years }
        ]}
      />

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        data={currentItem}
        fields={formFields}
        title={currentItem?.id ? 'Edit Achievement' : 'Add New Achievement'}
      />
    </div>
  );
}
