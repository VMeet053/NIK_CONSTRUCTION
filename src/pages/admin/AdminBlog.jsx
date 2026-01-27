
import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import AdminTable from '../../components/AdminTable';
import EditModal from '../../components/EditModal';
import AdminPageHeader from '../../components/AdminPageHeader';

export default function AdminBlog() {
  const { articles, updateArticle, setArticles, updateImage } = useContent();
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const columns = [
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'title', label: 'Article Title' },
    { key: 'category', label: 'Category' },
    { key: 'date', label: 'Date' },
  ];

  const formFields = [
    { name: 'title', label: 'Title' },
    { name: 'category', label: 'Category' },
    { name: 'date', label: 'Date' },
    { name: 'readTime', label: 'Read Time' },
    { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
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
      title: 'Delete Article',
      message: 'Are you sure you want to delete this article?'
    })) {
      try {
        setArticles(prev => prev.filter(a => a.id !== item.id));
        showToast('Article deleted successfully', 'success');
      } catch (error) {
        showToast('Failed to delete article', 'error');
      }
    }
  };

  const handleSave = (formData) => {
    try {
      if (currentItem.id) {
        updateArticle(currentItem.id, formData);
        showToast('Article updated successfully', 'success');
      } else {
        setArticles(prev => [...prev, {
          ...formData,
          id: Date.now(),
          image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800' // Default
        }]);
        showToast('Article created successfully', 'success');
      }
    } catch (error) {
      showToast('Failed to save article', 'error');
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
            updateImage('articles', item.id, reader.result);
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

  const categories = [...new Set(articles.map(a => a.category))].filter(Boolean);

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Blog Management" 
        stats={`${articles.length} Articles`}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>}
      >
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-md font-bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Article
        </button>
      </AdminPageHeader>

      <AdminTable 
        columns={columns} 
        data={articles} 
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
        title={currentItem?.id ? 'Edit Article' : 'Add New Article'}
      />
    </div>
  );
}
