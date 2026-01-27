
import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import AdminTable from '../../components/AdminTable';
import EditModal from '../../components/EditModal';
import AdminPageHeader from '../../components/AdminPageHeader';

export default function AdminProjects() {
  const { projects, addProject, updateProject, deleteProject, updateImage } = useContent();
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const columns = [
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'title', label: 'Project Title' },
    { key: 'category', label: 'Category' },
    { key: 'location', label: 'Location' },
    { key: 'year', label: 'Year' },
  ];

  const formFields = [
    { name: 'title', label: 'Title' },
    { name: 'category', label: 'Category' },
    { name: 'location', label: 'Location' },
    { name: 'year', label: 'Year' },
    { name: 'history', label: 'History (Description)', type: 'textarea' },
    { name: 'summary', label: 'Summary' },
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
      title: 'Delete Project',
      message: 'Are you sure you want to delete this project?'
    })) {
      try {
        await deleteProject(item.id);
        showToast('Project deleted successfully', 'success');
      } catch (error) {
        showToast('Failed to delete project', 'error');
      }
    }
  };

  const handleSave = (formData) => {
    try {
      if (currentItem.id) {
        updateProject(currentItem.id, formData);
        showToast('Project updated successfully', 'success');
      } else {
        addProject({
          ...formData,
          image: 'https://images.unsplash.com/photo-1548625361-98822605e55d?w=800' // Default image
        });
        showToast('Project created successfully', 'success');
      }
    } catch (error) {
      showToast('Failed to save project', 'error');
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
            updateImage('projects', item.id, reader.result);
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

  const categories = [...new Set(projects.map(p => p.category))].filter(Boolean);

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Projects Management" 
        stats={`${projects.length} Projects Found`}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
      >
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-md font-bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Project
        </button>
      </AdminPageHeader>

      <AdminTable 
        columns={columns} 
        data={projects} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        onImageChange={handleImageChange}
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
      />
    </div>
  );
}
